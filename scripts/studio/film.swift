// Decodes a stretch of a film into stills, or encodes stills back into a web film (H.264, no sound, fast start).
// usage: film decode <video> <outdir> <from seconds> <to seconds>
//        film encode <indir> <out.mp4> <fps> <bits per second>
import AVFoundation
import AppKit

let args = CommandLine.arguments
func fail(_ s: String) -> Never { FileHandle.standardError.write((s + "\n").data(using: .utf8)!); exit(1) }

func decode(_ src: String, _ out: String, _ t0: Double, _ t1: Double) {
    let asset = AVURLAsset(url: URL(fileURLWithPath: src))
    guard let track = asset.tracks(withMediaType: .video).first else { fail("no video track") }
    let reader = try! AVAssetReader(asset: asset)
    reader.timeRange = CMTimeRange(start: CMTime(seconds: t0, preferredTimescale: 600), end: CMTime(seconds: t1, preferredTimescale: 600))
    let output = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
    reader.add(output)
    reader.startReading()
    let ctx = CIContext()
    var n = 0
    while let sample = output.copyNextSampleBuffer(), let px = CMSampleBufferGetImageBuffer(sample) {
        let ci = CIImage(cvPixelBuffer: px)
        let cg = ctx.createCGImage(ci, from: ci.extent)!
        let data = NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:])!
        try! data.write(to: URL(fileURLWithPath: "\(out)/s\(String(format: "%04d", n)).png"))
        n += 1
    }
    print("decoded \(n) frames at \(track.nominalFrameRate) fps")
}

func encode(_ dir: String, _ out: String, _ fps: Int32, _ bps: Int) {
    let files = try! FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".png") }.sorted()
    guard let first = NSImage(contentsOfFile: "\(dir)/\(files[0])")?.cgImage(forProposedRect: nil, context: nil, hints: nil) else { fail("no frames") }
    let w = first.width, h = first.height
    try? FileManager.default.removeItem(atPath: out)
    let writer = try! AVAssetWriter(outputURL: URL(fileURLWithPath: out), fileType: .mp4)
    writer.shouldOptimizeForNetworkUse = true
    let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
        AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: w, AVVideoHeightKey: h,
        AVVideoCompressionPropertiesKey: [
            AVVideoAverageBitRateKey: bps, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
            AVVideoMaxKeyFrameIntervalKey: Int(fps) * 2, AVVideoExpectedSourceFrameRateKey: Int(fps)
        ]
    ])
    input.expectsMediaDataInRealTime = false
    let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: w, kCVPixelBufferHeightKey as String: h
    ])
    writer.add(input)
    writer.startWriting()
    writer.startSession(atSourceTime: .zero)
    for (i, f) in files.enumerated() {
        guard let cg = NSImage(contentsOfFile: "\(dir)/\(f)")?.cgImage(forProposedRect: nil, context: nil, hints: nil) else { fail("bad frame \(f)") }
        var buf: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &buf)
        let px = buf!
        CVPixelBufferLockBaseAddress(px, [])
        let gc = CGContext(data: CVPixelBufferGetBaseAddress(px), width: w, height: h, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(px),
                           space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
        gc.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
        CVPixelBufferUnlockBaseAddress(px, [])
        while !input.isReadyForMoreMediaData { usleep(2000) }
        adaptor.append(px, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: fps))
    }
    input.markAsFinished()
    let done = DispatchSemaphore(value: 0)
    writer.finishWriting { done.signal() }
    done.wait()
    if writer.status != .completed { fail("encode failed: \(String(describing: writer.error))") }
    print("encoded \(files.count) frames, \(w) x \(h)")
}

switch args.count > 1 ? args[1] : "" {
case "decode": decode(args[2], args[3], Double(args[4])!, Double(args[5])!)
case "encode": encode(args[2], args[3], Int32(args[4])!, Int(args[5])!)
default: fail("usage: film decode <video> <outdir> <from> <to> | film encode <indir> <out.mp4> <fps> <bps>")
}

// Writes a soft subject mask (Apple Vision subject lifting) for each input image.
// usage: fgmask <outdir> <img>...
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let outDir = URL(fileURLWithPath: args[1])
let ctx = CIContext()
for path in args.dropFirst(2) {
    let url = URL(fileURLWithPath: path)
    let handler = VNImageRequestHandler(url: url)
    let req = VNGenerateForegroundInstanceMaskRequest()
    do {
        try handler.perform([req])
        guard let obs = req.results?.first else { print("NOMASK \(path)"); continue }
        let buf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
        let ci = CIImage(cvPixelBuffer: buf)
        let name = url.deletingPathExtension().lastPathComponent + ".png"
        let out = outDir.appendingPathComponent(name)
        guard let cg = ctx.createCGImage(ci, from: ci.extent, format: .L8, colorSpace: CGColorSpace(name: CGColorSpace.linearGray)) else { print("CGFAIL \(path)"); continue }
        let dest = CGImageDestinationCreateWithURL(out as CFURL, UTType.png.identifier as CFString, 1, nil)!
        CGImageDestinationAddImage(dest, cg, nil)
        CGImageDestinationFinalize(dest)
        print("OK \(name) instances=\(obs.allInstances.count)")
    } catch { print("ERR \(path) \(error)") }
}

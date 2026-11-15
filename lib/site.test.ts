import { describe, expect, it } from "vitest"
import { siteConfig, whatsappLink } from "./site"

describe("whatsappLink", () => {
  it("uses the configured international phone number", () => {
    expect(whatsappLink()).toBe(`https://wa.me/${siteConfig.whatsappNumber}`)
  })

  it("encodes an optional message", () => {
    expect(whatsappLink("Hola LS Solutions")).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}?text=Hola%20LS%20Solutions`,
    )
  })
})

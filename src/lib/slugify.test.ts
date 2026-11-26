import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slugify";

describe("slugify", () => {
  it("maps Turkish letters", () => {
    expect(slugify("El oyması")).toBe("el-oymasi");
    expect(slugify("Gazimağusa")).toBe("gazimagusa");
    expect(slugify("PVC kapı")).toBe("pvc-kapi");
    expect(slugify("şımarık")).toBe("simarik");
    expect(slugify("ölçü")).toBe("olcu");
  });

  it("lower-cases dotted and dotless I with Turkish rules", () => {
    expect(slugify("İletişim")).toBe("iletisim");
    expect(slugify("IŞIK")).toBe("isik");
    expect(slugify("ĞÜŞİÖÇ")).toBe("gusioC".toLowerCase());
    expect(slugify("ç ğ ı İ ö ş ü")).toBe("c-g-i-i-o-s-u");
  });

  it("collapses punctuation", () => {
    expect(slugify("  Sandık — örnek kayıt! ")).toBe("sandik-ornek-kayit");
  });
});

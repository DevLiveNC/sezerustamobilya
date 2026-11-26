# Ortak parçalar — HTML mockup üretici
I = {
 'arrow':'<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
 'msg':'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
 'phone':'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
 'list':'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
 'plus':'<path d="M5 12h14M12 5v14"/>','minus':'<path d="M5 12h14"/>',
 'copy':'<rect x="9" y="9" width="12" height="12" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
 'dl':'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
 'check':'<path d="M20 6 9 17l-5-5"/>','down':'<path d="m6 9 6 6 6-6"/>',
 'zoom':'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
 'cam':'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"/><circle cx="12" cy="13" r="3"/>',
 'info':'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
 'alert':'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
 'pin':'<path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
 'x':'<path d="M18 6 6 18M6 6l12 12"/>',
}
def ic(n,cls='ico',st=''): return f'<svg class="{cls}" viewBox="0 0 24 24" style="{st}">{I[n]}</svg>'
def todo(t): return f'<span class="todo">[SAHİP DOLDURACAK: {t}]</span>'
def ph(slot,ratio,minsize,brief,style='',dark=False,small=False):
    return f'''<div class="ph{' dk' if dark else ''}" style="{style}"><i class="cm tl"></i><i class="cm tr"></i><i class="cm bl"></i><i class="cm br"></i>
<span class="tag">{slot}</span><span class="tag-r">{ratio}</span>
<div class="lbl"{' style="padding:10px 12px"' if small else ''}><div class="t">FOTOĞRAF ATÖLYEDEN GELECEK</div><div class="s">{ratio}{(' · min '+minsize) if minsize else ''}<br>{brief}</div></div></div>'''
def sh(idx,end=''): return f'<div class="sh"><span class="idx">{idx}</span><span class="rule"></span>{f"<span class=end>{end}</span>" if end else ""}</div>'
def wm(): return '<a class="wm" href="#"><span class="a">Sezer Usta</span><span class="b">MOBİLYA<i></i>GAZİMAĞUSA</span></a>'
RIBBON='<div class="ribbon"><b>ÖNİZLEME</b> — fotoğraflar ve ürün bilgileri işletmeden bekleniyor.</div>'
def header(active=''):
    caret='<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>'
    return f'''{RIBBON}<header class="hdr"><div class="wrap">{wm()}
<nav class="nav"><a>Ürünler {caret}</a><a>Atölye</a><a>Referanslar</a><a>Ölçü Rehberi</a><a>İletişim</a></nav>
<div class="hdr-actions"><a class="qicon">{ic('list')} Teklif listesi <span class="n">{active or 0}</span></a><a class="btn btn-p btn-s">Teklif Al</a></div></div></header>'''
def mheader(n=0):
    return f'''<div class="ribbon"><b>ÖNİZLEME</b> · fotoğraf ve bilgiler bekleniyor</div><header class="hdr"><div class="wrap">{wm()}<div class="burger"><a class="qicon">{ic('list')}<span class="n">{n}</span></a><span class="lines"></span></div></div></header>'''
FOOTER=f'''<footer class="ftr"><div class="wrap"><div class="grid">
<div>{wm()}<p style="margin-top:22px;max-width:300px;color:rgba(242,234,223,.78);font-size:15px">“El oyma sanatı ve mobilya ustası.”</p></div>
<div><h5>Ürünler</h5><ul><li>El oyması tek parçalar</li><li>Melamin kapı</li><li>PVC kapı</li><li>Özel üretim</li></ul></div>
<div><h5>Atölye</h5><ul><li>Hakkımızda</li><li>Referanslar</li><li>Ölçü rehberi</li><li>Sık sorulanlar</li></ul></div>
<div><h5>İletişim</h5><ul><li>+90 533 833 64 81 <span class="mono-s" style="opacity:.6">· WHATSAPP</span></li><li>Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs</li><li><span class="todo on-dark">[SAHİP DOLDURACAK: çalışma saatleri]</span></li><li><span class="todo on-dark">[SAHİP DOLDURACAK: e-posta]</span></li></ul></div>
</div><div class="base"><span>© SEZER USTA MOBİLYA · <span class="todo on-dark" style="font-size:10px">[SAHİP DOLDURACAK: ticari unvan]</span></span><span>GİZLİLİK · KVKK (TASLAK)</span><span>SİTE: LIVEDEVELOPMENT</span></div></div></footer>'''
def page(title,body,mobile=False,extra_css=''):
    return f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><link rel="stylesheet" href="talas-cila.css"><style>{extra_css}</style></head><body class="{'m' if mobile else ''}">{body}</body></html>'''

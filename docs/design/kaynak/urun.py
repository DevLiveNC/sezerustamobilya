from parcalar import *
css=r'''
.crumb{padding:28px 0 0;display:flex;gap:10px;font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;color:var(--ink-soft)}
.crumb b{color:var(--ink);font-weight:500}
.pd{display:grid;grid-template-columns:7fr 5fr;gap:72px;padding:36px 0 120px}
.gal .thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;margin-top:36px}
.gal .th{position:relative}
.gal .th .k{display:block;margin-top:24px;font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft)}
.gal .th.on .k{color:var(--ink)}
.gal .th.on .k:before{content:"● ";color:var(--varnish)}
.info{position:sticky;top:0}
.info h1{font-size:76px;margin:18px 0 10px}
.info .sub{font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;color:var(--ink-soft)}
.label{margin-top:36px;background:var(--linen);border:1px solid var(--line);padding:26px 28px}
.label .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.one{margin-top:22px;display:flex;gap:14px;align-items:flex-start;border-left:2px solid var(--varnish);padding:4px 0 4px 16px;font-size:15px}
.ctas{display:flex;flex-direction:column;gap:10px;margin-top:28px}
.ctas .btn{width:100%;justify-content:space-between}
.price{margin-top:18px;font-family:var(--f-mono);font-size:11px;letter-spacing:.08em;color:var(--ink-soft);display:flex;gap:8px;align-items:center}
.boxdraw{margin-top:26px;border-top:1px solid var(--line);padding-top:20px}
.detail{padding:120px 0}
.detail .g{display:grid;grid-template-columns:6fr 6fr;gap:88px;align-items:center}
.loupe{position:absolute;width:180px;height:180px;border-radius:50%;border:1.5px solid var(--ink);right:7%;top:6%;background:rgba(250,246,239,.55);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-lift)}
.loupe span{font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;text-align:center}
.keys{display:grid;grid-template-columns:auto 1fr;gap:10px 18px;margin-top:30px;font-size:15px}
.kbd{font-family:var(--f-mono);font-size:11px;border:1px solid var(--ink);border-bottom-width:2px;border-radius:3px;padding:2px 8px;text-align:center;background:var(--linen)}
.rel{padding:120px 0}
.rel .g{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
.rel h3{font-family:var(--f-serif);font-size:20px;font-weight:400;margin:22px 0 6px}
'''
box='''<svg viewBox="0 0 420 210" width="100%" style="display:block">
<g fill="none" stroke="#211B16" stroke-width="1.1"><path d="M70 70 L290 70 L350 40 L130 40 Z"/><path d="M70 70 V170 H290 V70"/><path d="M290 170 L350 140 V40"/>
<path d="M78 78 H282 V162 H78 Z" stroke="#D3C2A8"/><path d="M70 70 L290 70" stroke-width="1.4"/></g>
<g stroke="#211B16" stroke-width="1" fill="#211B16"><path d="M70 188 H290"/><path d="M70 181v14M290 181v14"/><path d="M70 188l7-3v6zM290 188l-7-3v6z"/>
<path d="M40 70 V170"/><path d="M33 70h14M33 170h14"/><path d="M40 70l-3 7h6zM40 170l-3-7h6z"/>
<path d="M300 182 L360 152"/><path d="M296 176l8 12M356 146l8 12"/></g>
<rect x="142" y="180" width="76" height="16" fill="#FAF6EF"/><text x="180" y="192" text-anchor="middle" font-family="IBM Plex Mono" font-size="10.5" fill="#4A3426">E — cm</text>
<rect x="31" y="98" width="18" height="44" fill="#FAF6EF"/><text transform="translate(44 120) rotate(-90)" text-anchor="middle" font-family="IBM Plex Mono" font-size="10.5" fill="#4A3426">B — cm</text>
<text x="352" y="182" font-family="IBM Plex Mono" font-size="10.5" fill="#4A3426">D — cm</text>
<text x="410" y="20" text-anchor="end" font-family="IBM Plex Mono" font-size="9.5" fill="#6A5D50" letter-spacing="1">ŞEMATİK · ÖLÇÜ BEKLENİYOR</text></svg>'''
def rel(slot,t,st):
    return f'''<article>{ph(slot,'4:5','1600×2000','Önden, gün ışığı','aspect-ratio:4/5',small=True)}<h3>{t}</h3><span class="badge wait">{st}</span></article>'''
body=header()+f'''<main><div class="wrap">
<div class="crumb"><span>ANA SAYFA</span>/<span>ÜRÜNLER</span>/<span>EL OYMASI</span>/<b>EL OYMASI SANDIK — ÖRNEK KAYIT</b></div>
<div class="pd"><div class="gal">
{ph('product-front','4:5','1600×2000','Sandık, tam önden, göz hizasından;<br>gün ışığı, sade zemin, gölge yumuşak','aspect-ratio:4/5')}
<div class="thumbs">
<div class="th on">{ph('product-front','4:5','','Önden','aspect-ratio:4/5',small=True)}<span class="k">01 · ÖNDEN</span></div>
<div class="th">{ph('product-angle','4:5','','45° açıdan','aspect-ratio:4/5',small=True)}<span class="k">02 · 45°</span></div>
<div class="th">{ph('product-detail','1:1','','Oyma detayı','aspect-ratio:4/5',small=True)}<span class="k">03 · OYMA DETAYI</span></div>
<div class="th">{ph('product-scale','3:4','','Metre / el ile ölçek','aspect-ratio:4/5',small=True)}<span class="k">04 · ÖLÇEK</span></div>
</div></div>
<aside class="info"><div class="top" style="display:flex;justify-content:space-between;align-items:center"><span class="sub">TEK PARÇA · EL OYMASI · ÖRNEK KAYIT</span><span class="badge wait">Durum bekleniyor</span></div>
<h1 class="display">El oyması sandık</h1>
<p class="soft" style="font-size:17px">Doğal ahşap, tamamen el oyması. Ürün açıklaması: {todo('ürün hikâyesi')}</p>
<div class="label"><div class="top"><span class="mono">MÜZE ETİKETİ</span><span class="mono-s soft">NO. {todo('ürün kodu')}</span></div>
<table class="spec"><tr><td>AĞAÇ</td><td>{todo('ağaç türü')}</td></tr><tr><td>CİLA / BOYA</td><td>{todo('cila')}</td></tr><tr><td>ÖLÇÜ (E×B×D)</td><td class="soft">işletmeden bekleniyor</td></tr><tr><td>DURUM</td><td>{todo('mevcut / satıldı')}</td></tr><tr><td>YAPIM</td><td>El oyması, el emeği</td></tr></table>
<div class="boxdraw">{box}</div></div>
<div class="one"><span>“Her üründen sadece bir adet vardır.” Satıldığında bu sayfa “satıldı” olarak kalır; benzeri için özel üretim isteyebilirsiniz.</span></div>
<div class="ctas"><a class="btn btn-p">Teklif listesine ekle {ic('plus')}</a><a class="btn btn-g">WhatsApp’tan bu parçayı sorun {ic('msg')}</a></div>
<div class="price">{ic('info','ico','width:14px;height:14px')} FİYAT İÇİN TEKLİF ALIN · MESAJA ÜRÜN ADI VE SAYFA BAĞLANTISI EKLENİR</div>
</aside></div></div>
<section class="detail oak"><div class="wrap">{sh('OYMA DETAYI','1× — 4× YAKINLAŞTIRMA')}
<div class="g"><div style="position:relative">{ph('product-detail','1:1','3000×3000','Oymanın en ince yeri, keskin, yakın;<br>yandan gelen gün ışığı derinliği gösterir','aspect-ratio:1/1')}
<div class="loupe"><span>LUP · 2,5×<br><span style="color:var(--ink-soft)">imleçle gezin</span></span></div></div>
<div><h2 class="display" style="font-size:72px">Bıçağın izini yakından görün.</h2>
<p class="soft" style="font-size:18px;margin-top:22px;max-width:480px">Detay fotoğrafına tıklayın; yakınlaştırın, sürükleyin. Telefonda iki parmakla büyütün.</p>
<div class="keys"><span class="kbd">+ / −</span><span>Yakınlaştır / uzaklaştır</span><span class="kbd">← ↑ → ↓</span><span>Kaydır</span><span class="kbd">0</span><span>Sıfırla</span><span class="kbd">Esc</span><span>Kapat</span></div>
<a class="btn btn-p" style="margin-top:36px">{ic('zoom')} Detayı aç</a></div></div></div></section>
<section class="rel"><div class="wrap">{sh('BENZER TEK PARÇALAR','EL OYMASI')}
<div class="g">{rel('product-front · ayna','El oyması ayna çerçevesi','Durum bekleniyor')}{rel('product-front · dolap','El oyması dolap','Durum bekleniyor')}{rel('product-front · sandık','El oyması sandık — örnek 2','Durum bekleniyor')}
<article style="border:1px solid var(--line);padding:28px;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:4/5.9"><div><span class="mono soft">ÖZEL ÜRETİM</span><h3 style="font-family:var(--f-display);font-size:44px;line-height:1;margin-top:18px">Benzerini kendi ölçünüzde isteyin.</h3></div><a class="btn btn-g btn-s">Özel üretim {ic('arrow')}</a></article></div>
<p class="mono-s soft" style="margin-top:34px">ÜRÜN ADLARI ÖRNEKTİR · GERÇEK LİSTE İŞLETMEDEN GELECEK</p></div></section>
</main>'''+FOOTER
open('urun-detay-el-oymasi-1440.html','w').write(page('El oyması sandık — Sezer Usta Mobilya',body,extra_css=css))

from parcalar import *
css=r'''
body{padding-bottom:76px}
.hero{padding:28px 0 0}
.hero h1{font-size:60px;margin:18px 0 20px;line-height:.96}
.hero h1 em{font-style:italic;color:var(--walnut)}
.hero .lead{font-size:17px;line-height:1.55}
.sh{margin-bottom:24px}.sh .end{display:none}
.cats{display:flex;gap:12px;overflow:hidden;margin:36px -20px 0;padding:0 20px 4px}
.cat{flex:0 0 232px;border:1px solid var(--line);background:var(--linen);padding:16px 16px 18px}
.cat .i{font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;color:var(--ink-soft)}
.cat .n{font-family:var(--f-display);font-size:32px;line-height:1;margin:10px 0 8px;display:block}
.cat .d{font-size:13.5px;color:var(--ink-soft);line-height:1.45}
.mruler{height:16px;margin-top:28px;border-top:1px solid var(--ink);background:repeating-linear-gradient(to right,var(--ink) 0 1px,transparent 1px 40px) 0 0/100% 14px no-repeat,repeating-linear-gradient(to right,rgba(33,27,22,.45) 0 1px,transparent 1px 8px) 0 0/100% 6px no-repeat}
.scrollhint{display:flex;justify-content:space-between;margin-top:10px}
section.blk{padding:72px 0}
.h2{font-size:44px;line-height:1}
.museum{margin-top:22px;border-top:1px solid var(--ink);padding-top:12px}
.museum .top{display:flex;justify-content:space-between;align-items:center}
.museum h3{font-family:var(--f-serif);font-size:22px;font-weight:400;margin:10px 0 10px}
.museum dl{display:grid;grid-template-columns:62px 1fr;row-gap:6px;font-size:13.5px}
.museum dt{font-family:var(--f-mono);font-size:10px;letter-spacing:.1em;color:var(--ink-soft);padding-top:3px}
.todo{white-space:normal}
.spec td{font-size:14px}.spec td:first-child{width:40%}
.proc{margin-top:8px;border-left:1px solid var(--ink);margin-left:18px}
.step{display:grid;grid-template-columns:38px 1fr;gap:14px;padding:0 0 22px;margin-left:-19px}
.step .dot{width:37px;height:37px;border:1px solid var(--ink);background:var(--shaving);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:11px}
.step:last-child .dot{background:var(--walnut);color:var(--shaving)}
.step h4{font-family:var(--f-display);font-size:30px;font-weight:400;line-height:1;margin-top:4px}
.step p{font-size:14px;color:var(--ink-soft);margin-top:4px}
.atolye blockquote{font-family:var(--f-display);font-size:46px;line-height:1.02;margin-top:36px}
.atolye blockquote em{color:#E3D2B6}
.card{background:var(--linen);border:1px solid var(--line);padding:22px;margin-top:28px}
.card .phone{font-family:var(--f-display);font-size:38px;line-height:1;margin:8px 0 18px}
.card dl div{display:grid;grid-template-columns:78px 1fr;padding:10px 0;border-top:1px solid var(--line);font-size:14px}
.card dt{font-family:var(--f-mono);font-size:10px;letter-spacing:.1em;color:var(--ink-soft);padding-top:3px}
.ftr{padding:56px 0 28px}.ftr .grid{grid-template-columns:1fr 1fr;gap:32px}.ftr .grid>div:first-child,.ftr .grid>div:last-child{grid-column:span 2}
.ftr .base{flex-direction:column;gap:10px;margin-top:40px}
'''
def piece(slot,title,brief):
    return f'''<article style="margin-bottom:48px">{ph(slot,'4:5','1600×2000',brief,'aspect-ratio:4/5;margin:0 2px',small=True)}
<div class="museum"><div class="top"><span class="mono-s soft">ÖRNEK KAYIT</span><span class="badge wait">Durum bekleniyor</span></div>
<h3>{title}</h3><dl><dt>AĞAÇ</dt><dd>{todo('ağaç türü')}</dd><dt>ÖLÇÜ</dt><dd class="soft">işletmeden bekleniyor</dd></dl></div></article>'''
body=mheader()+f'''<main>
<section class="hero"><div class="wrap">{sh('01 — ATÖLYE')}
<span class="mono-s soft">BÜYÜK SANAYİ · GAZİMAĞUSA · KUZEY KIBRIS</span>
<h1 class="display"><em>El oyma</em> sanatı ve mobilya ustası.</h1>
<p class="lead">Doğal ahşaptan, tamamen el oyması tek parçalar. Toptan ve perakende melamin ve PVC kapı. Ölçünüze göre özel üretim.</p>
<div style="margin:30px 2px 0">{ph('home-hero-4x5','4:5','1600×2000','Bitmiş oyma parça, gün ışığında','aspect-ratio:4/5',small=True)}</div>
<div class="mruler"></div>
<div class="cats">
<a class="cat"><span class="i">01 · TEK PARÇA</span><span class="n">El oyması</span><span class="d">Sandık, ayna çerçevesi, dolap — her biri bir tane.</span></a>
<a class="cat"><span class="i">02 · TOPTAN + PERAKENDE</span><span class="n">Melamin kapı</span><span class="d">Ölçü, açılım, renk — yapılandırıp teklif isteyin.</span></a>
<a class="cat"><span class="i">03 · TOPTAN</span><span class="n">PVC kapı</span><span class="d">Aynı yapılandırıcı.</span></a></div>
<div class="scrollhint"><span class="mono-s soft">1 / 4 · KAYDIRIN</span><span class="mono-s soft">→</span></div>
</div></section>
<section class="blk"><div class="wrap">{sh('02 — TEK PARÇALAR')}
<h2 class="display h2" style="margin-bottom:16px">Her üründen sadece bir adet.</h2>
<p class="soft" style="font-size:15px;margin-bottom:36px">“Farklı boyutlarda sandık, ayna çerçevesi ve dolaplar. Tamamıyla el oyması, el emeği.”</p>
{piece('product-front · sandık','El oyması sandık','Sandık, önden, gün ışığı')}
{piece('product-front · ayna','El oyması ayna çerçevesi','Ayna çerçevesi, önden')}
<a class="btn btn-g" style="width:100%">Tüm el oyması parçalar {ic('arrow')}</a></div></section>
<section class="blk oak"><div class="wrap">{sh('03 — KAPILAR')}
<span class="badge ok">Satışta · 12 Kasım 2026’dan beri</span>
<h2 class="display h2" style="margin:20px 0 14px">Kapınızı ölçüsüyle çizin, teklifi alın.</h2>
<p style="font-family:var(--f-display);font-size:26px;line-height:1.15">“Uygun fiyat, garantili ürün.”</p>
<div style="background:var(--linen);border:1px solid var(--line);padding:6px 16px 4px;margin:24px 0">
<table class="spec"><tr><td>SATIŞ</td><td>Toptan + perakende</td></tr><tr><td>MALZEME</td><td>Melamin · PVC</td></tr><tr><td>MODELLER</td><td>{todo('modeller')}</td></tr><tr><td>KARTELA</td><td>{todo('renkler')}</td></tr><tr><td>GARANTİ</td><td>“Garantili” · {todo('süre')}</td></tr></table></div>
<a class="btn btn-p" style="width:100%">Kapı yapılandırıcı {ic('arrow')}</a></div></section>
<section class="blk"><div class="wrap">{sh('04 — ÖZEL ÜRETİM')}
<h2 class="display h2" style="margin-bottom:28px">Ölçünüzden başlar, cilayla biter.</h2>
<div class="proc">
<div class="step"><div class="dot">01</div><div><h4>Ölçü</h4><p>Yerin ve işin ölçüsü alınır.</p></div></div>
<div class="step"><div class="dot">02</div><div><h4>Çizim</h4><p>Parça ölçüleriyle çizilir.</p></div></div>
<div class="step"><div class="dot">03</div><div><h4>Oyma</h4><p>Desen elde ahşaba işlenir.</p></div></div>
<div class="step"><div class="dot">04</div><div><h4>Cila</h4><p>Yüzey hazırlanır, cilalanır.</p></div></div>
<div class="step"><div class="dot">05</div><div><h4>Teslim</h4><p>Teslimat / montaj: {todo('bölgeler')}</p></div></div></div></div></section>
<section class="blk dark atolye"><div class="wrap">{sh('05 — ATÖLYE')}
{ph('hands-carving-1x1','1:1','1600×1600','Eller + oyma bıçağı, yakından','aspect-ratio:1/1;margin:0 2px',dark=True,small=True)}
<blockquote>“Tamamıyla <em>el oyması</em>, el emeği.”</blockquote>
<p class="mono-s" style="opacity:.6;margin-top:14px">İŞLETMENİN PAYLAŞIMINDAN · EYLÜL 2023</p>
<p style="margin-top:24px"><span class="todo on-dark">[SAHİP DOLDURACAK: ustanın adı ve hikâyesi]</span></p></div></section>
<section class="blk"><div class="wrap">{sh('06 — İLETİŞİM')}
<h2 class="display h2">Ölçünüzü söyleyin, gerisini atölyede konuşalım.</h2>
<div class="card"><span class="mono soft">TELEFON · WHATSAPP</span><div class="phone">+90 533 833 64 81</div>
<dl><div><dt>ADRES</dt><dd>Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs<br>{todo('açık adres')}</dd></div><div><dt>SAATLER</dt><dd>{todo('çalışma saatleri')}</dd></div></dl></div></div></section>
</main>{FOOTER}
<nav class="mbar"><a>{ic('msg')} WhatsApp</a><a>{ic('phone')} Ara</a><a class="p">{ic('list')} Teklif</a></nav>'''
open('anasayfa-390.html','w').write(page('Sezer Usta Mobilya',body,True,css))

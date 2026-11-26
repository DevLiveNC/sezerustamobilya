from parcalar import *
css = r'''
.hero{padding:72px 0 0}
.hero .g{display:grid;grid-template-columns:7fr 5fr;gap:72px;align-items:end}
.hero h1{font-size:128px;margin:28px 0 36px}
.hero h1 em{font-style:italic;color:var(--walnut)}
.hero .lead{font-size:20px;line-height:1.55;max-width:560px;color:var(--ink)}
.hero .ctas{display:flex;gap:14px;margin-top:36px}
.hero .note{margin-top:56px;display:flex;gap:28px;border-top:1px solid var(--line);padding-top:18px}
.hero .note div{flex:1}
.hero .note .k{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.12em;color:var(--ink-soft);display:block;margin-bottom:6px}
.hero .note .v{font-size:15px}
.heroimg{position:relative;padding-right:44px}
.vdim{position:absolute;right:0;top:0;bottom:0;width:30px;display:flex;flex-direction:column;align-items:center}
.vdim .ln{flex:1;width:1px;background:var(--ink);position:relative}
.vdim .tk{width:11px;height:1px;background:var(--ink)}
.vdim .lb{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;writing-mode:vertical-rl;padding:10px 0;background:var(--shaving)}
.ruler{margin-top:96px;border-top:1px solid var(--ink);border-bottom:1px solid var(--line);position:relative}
.ruler .ticks{height:22px;background:
 repeating-linear-gradient(to right,var(--ink) 0 1px,transparent 1px 82px) 0 0/100% 22px no-repeat,
 repeating-linear-gradient(to right,var(--ink) 0 1px,transparent 1px 41px) 0 0/100% 13px no-repeat,
 repeating-linear-gradient(to right,rgba(33,27,22,.45) 0 1px,transparent 1px 8.2px) 0 0/100% 7px no-repeat}
.ruler .nums{position:absolute;top:24px;left:0;right:0;display:flex}
.ruler .nums span{width:82px;font-family:var(--f-mono);font-size:9.5px;color:var(--ink-soft);padding-left:3px}
.ruler .cats{display:grid;grid-template-columns:repeat(4,1fr);padding-top:46px;padding-bottom:30px}
.ruler .cats a{border-left:1px solid var(--line);padding:0 26px 0 20px;display:block}
.ruler .cats a:first-child{border-left:0;padding-left:0}
.ruler .cats .i{font-family:var(--f-mono);font-size:11px;letter-spacing:.12em;color:var(--ink-soft)}
.ruler .cats .n{font-family:var(--f-display);font-size:38px;line-height:1.05;margin:8px 0 8px;display:flex;justify-content:space-between;align-items:baseline}
.ruler .cats .n .ico{width:22px;height:22px}
.ruler .cats .d{font-size:14.5px;color:var(--ink-soft);line-height:1.5}
section.blk{padding:128px 0}
.h2{font-size:72px}
.intro{display:grid;grid-template-columns:5fr 7fr;gap:72px;align-items:end;margin-bottom:72px}
.intro p{font-size:18px;max-width:520px}
.pieces{display:grid;grid-template-columns:1.15fr 1fr 1fr;gap:56px;align-items:start}
.piece:nth-child(2){margin-top:120px}.piece:nth-child(3){margin-top:40px}
.museum{margin-top:30px;border-top:1px solid var(--ink);padding-top:14px}
.museum .top{display:flex;justify-content:space-between;align-items:center}
.museum h3{font-family:var(--f-serif);font-size:24px;line-height:1.2;font-weight:400;margin:12px 0 14px}
.museum dl{display:grid;grid-template-columns:86px 1fr;row-gap:7px;font-size:14px}
.museum dt{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft);padding-top:3px}
.doors .g{display:grid;grid-template-columns:5fr 7fr;gap:80px}
.doors .since{display:inline-flex;gap:10px;align-items:center;margin-bottom:28px}
.doors blockquote{font-family:var(--f-display);font-size:34px;line-height:1.15;margin:30px 0 14px;max-width:460px}
.doors .src{font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;color:var(--ink-soft)}
.sheet{background:var(--linen);border:1px solid var(--line);display:grid;grid-template-columns:250px minmax(0,1fr)}
.sheet .todo{white-space:normal}
.sheet .draw{border-right:1px solid var(--line);padding:28px 24px;background-image:linear-gradient(rgba(211,194,168,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(211,194,168,.45) 1px,transparent 1px);background-size:16px 16px;position:relative}
.sheet .cols{padding:28px 32px}
.sheet .cols .hd{display:grid;grid-template-columns:128px minmax(0,1fr) minmax(0,1fr);font-family:var(--f-mono);font-size:11px;letter-spacing:.12em;padding-bottom:12px;border-bottom:1px solid var(--ink)}
.sheet .row{display:grid;grid-template-columns:128px minmax(0,1fr) minmax(0,1fr);gap:0 12px;padding:13px 0;border-bottom:1px solid var(--line);font-size:14px;align-items:center}
.sheet .row>span:first-child{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft)}
.sheet .row .todo{font-size:11px}
.proc{display:grid;grid-template-columns:repeat(5,1fr);position:relative;margin-top:24px}
.proc:before{content:"";position:absolute;left:0;right:0;top:22px;border-top:1px solid var(--ink)}
.step{padding-right:28px;position:relative}
.step .dot{width:45px;height:45px;border:1px solid var(--ink);background:var(--shaving);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:12px;position:relative}
.step:last-child .dot{background:var(--walnut);color:var(--shaving);border-color:var(--walnut)}
.step h4{font-family:var(--f-display);font-size:40px;font-weight:400;margin:26px 0 8px;line-height:1}
.step p{font-size:15px;color:var(--ink-soft);line-height:1.55}
.atolye .g{display:grid;grid-template-columns:6fr 6fr;gap:88px;align-items:center}
.atolye blockquote{font-family:var(--f-display);font-size:76px;line-height:1;letter-spacing:-.02em}
.atolye blockquote em{color:#E3D2B6}
.atolye .src{font-family:var(--f-mono);font-size:11px;letter-spacing:.08em;color:rgba(242,234,223,.6);margin-top:22px}
.atolye .story{margin-top:44px;border-top:1px solid var(--line-on-dark);padding-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:28px;font-size:15px;color:rgba(242,234,223,.85)}
.atolye .story .k{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.12em;color:rgba(242,234,223,.55);display:block;margin-bottom:8px}
.contact .g{display:grid;grid-template-columns:7fr 5fr;gap:80px;align-items:start}
.contact h2{font-size:88px}
.card{background:var(--linen);border:1px solid var(--line);padding:32px}
.card .phone{font-family:var(--f-display);font-size:46px;letter-spacing:-.01em;line-height:1;margin:10px 0 22px}
.card .btns{display:flex;flex-direction:column;gap:10px}
.card .btns .btn{width:100%;justify-content:space-between}
.card dl{margin-top:26px;font-size:14.5px}
.card dl div{display:grid;grid-template-columns:110px 1fr;padding:10px 0;border-top:1px solid var(--line)}
.card dt{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft);padding-top:3px}
'''
nums=''.join(f'<span>{i*10}</span>' for i in range(16))
def piece(slot,title,brief,h):
    return f'''<article class="piece">{ph(slot,'4:5','1600×2000',brief,f'aspect-ratio:4/5')}
<div class="museum"><div class="top"><span class="mono-s soft">TEK PARÇA · ÖRNEK KAYIT</span><span class="badge wait">Durum bekleniyor</span></div>
<h3>{title}</h3><dl><dt>AĞAÇ</dt><dd>{todo('ağaç türü')}</dd><dt>ÖLÇÜ</dt><dd class="soft">E — × B — × D — cm · işletmeden bekleniyor</dd><dt>CİLA</dt><dd>{todo('cila / boya')}</dd></dl></div></article>'''
door_svg='''<svg viewBox="0 0 250 330" width="100%" style="display:block">
<g fill="none" stroke="#211B16" stroke-width="1.2"><rect x="58" y="22" width="150" height="270"/><rect x="68" y="32" width="130" height="260" stroke-width="1"/>
<path d="M198 32 L68 162 L198 292" stroke-dasharray="4 4" stroke="#A8662E" stroke-width="1"/>
<rect x="76" y="156" width="14" height="4" rx="1" fill="#211B16"/></g>
<g stroke="#211B16" stroke-width="1" fill="#211B16"><path d="M68 310 H198" /><path d="M68 304v12M198 304v12"/><path d="M68 310l7-3v6zM198 310l-7-3v6z"/>
<path d="M30 32 V292"/><path d="M24 32h12M24 292h12"/><path d="M30 32l-3 7h6zM30 292l-3-7h6z"/></g>
<rect x="104" y="302" width="58" height="16" fill="#FAF6EF"/><text x="133" y="314" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#4A3426" letter-spacing=".5">E — cm</text>
<rect x="22" y="138" width="16" height="48" fill="#FAF6EF"/><text transform="translate(34 162) rotate(-90)" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#4A3426">B — cm</text>
</svg>'''
body = header() + f'''
<main>
<section class="hero"><div class="wrap"><div class="g">
<div>{sh('01 — ATÖLYE','BÜYÜK SANAYİ · GAZİMAĞUSA · KUZEY KIBRIS')}
<h1 class="display"><em>El oyma</em> sanatı ve mobilya ustası.</h1>
<p class="lead">Doğal ahşaptan, tamamen el oyması tek parçalar. Toptan ve perakende melamin ve PVC kapı. Ölçünüze göre özel üretim.</p>
<div class="ctas"><a class="btn btn-p">{ic('msg')} WhatsApp’tan yazın</a><a class="btn btn-g">Teklif listesi oluşturun {ic('arrow')}</a></div>
<div class="note"><div><span class="k">TEK PARÇA</span><span class="v">“Her üründen sadece bir adet vardır.”</span></div><div><span class="k">KAPI SATIŞI</span><span class="v">12 Kasım 2026’dan beri, toptan ve perakende</span></div><div><span class="k">TELEFON</span><span class="v">+90 533 833 64 81</span></div></div>
</div>
<div class="heroimg">{ph('home-hero-4x5','4:5','1600×2000','Bitmiş bir oyma parça, gün ışığında,<br>atölye kapısı ya da sade duvar önünde','aspect-ratio:4/5')}
<div class="vdim"><span class="tk"></span><span class="ln"></span><span class="lb">KADRAJ 4:5 · DİKEY</span><span class="ln"></span><span class="tk"></span></div></div>
</div>
<div class="ruler"><div class="ticks"></div><div class="nums">{nums}</div>
<div class="cats">
<a><span class="i">01 · TEK PARÇA</span><span class="n">El oyması {ic('arrow')}</span><span class="d">Sandık, ayna çerçevesi, dolap — her biri bir tane.</span></a>
<a><span class="i">02 · TOPTAN + PERAKENDE</span><span class="n">Melamin kapı {ic('arrow')}</span><span class="d">Ölçü, açılım, renk — yapılandırıp teklif isteyin.</span></a>
<a><span class="i">03 · TOPTAN + PERAKENDE</span><span class="n">PVC kapı {ic('arrow')}</span><span class="d">Aynı yapılandırıcı, PVC modeller için.</span></a>
<a><span class="i">04 · ÖLÇÜYE GÖRE</span><span class="n">Özel üretim {ic('arrow')}</span><span class="d">Fikrinizi ve ölçünüzü getirin, atölyede çizelim.</span></a>
</div></div></div></section>

<section class="blk"><div class="wrap">{sh('02 — TEK PARÇALAR','MEVCUT OLANLAR ÖNCE')}
<div class="intro"><h2 class="display h2">Her üründen sadece bir adet.</h2><p class="soft">“Farklı boyutlarda sandık, ayna çerçevesi ve dolaplar. Tamamıyla el oyması, el emeği.” Satılan parça sitede “satıldı” olarak kalır; benzeri için özel üretim isteyebilirsiniz.</p></div>
<div class="pieces">
{piece('product-front · sandık','El oyması sandık','Sandık, önden, gün ışığı,<br>sade zemin',0)}
{piece('product-front · ayna','El oyması ayna çerçevesi','Ayna çerçevesi, önden,<br>yansımada atölye görünmesin',0)}
{piece('product-front · dolap','El oyması dolap','Dolap, önden, kapaklar kapalı',0)}
</div>
<div style="margin-top:72px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:22px"><span class="mono-s soft">ÜRÜN ADLARI, AĞAÇ, ÖLÇÜ VE DURUM İŞLETMEDEN GELECEK · ŞU AN ÖRNEK KAYIT</span><a class="btn btn-g btn-s">Tüm el oyması parçalar {ic('arrow')}</a></div>
</div></section>

<section class="blk oak doors"><div class="wrap">{sh('03 — KAPILAR','MELAMİN · PVC')}
<div class="g"><div>
<span class="since badge ok">Satışta · 12 Kasım 2026’dan beri</span>
<h2 class="display h2">Kapınızı ölçüsüyle çizin, teklifi alın.</h2>
<blockquote>“Uygun fiyat, garantili ürün.”</blockquote><div class="src">İŞLETMENİN 12 KASIM 2026 DUYURUSUNDAN</div>
<div style="display:flex;gap:12px;margin-top:40px"><a class="btn btn-p">Kapı yapılandırıcı {ic('arrow')}</a><a class="btn btn-g">Ölçü nasıl alınır</a></div>
</div>
<div class="sheet"><div class="draw"><div class="mono-s soft" style="margin-bottom:10px">ÖN GÖRÜNÜŞ · 1:20</div>{door_svg}</div>
<div class="cols"><div class="hd"><span>ÖZELLİK</span><span>MELAMİN</span><span>PVC</span></div>
<div class="row"><span>SATIŞ</span><span style="grid-column:span 2">Toptan ve perakende</span></div>
<div class="row"><span>MODELLER</span><span style="grid-column:span 2">{todo('model / seri adları')}</span></div>
<div class="row"><span>RENK / DESEN</span><span style="grid-column:span 2">{todo('renk ve desen kartelası')}</span></div>
<div class="row"><span>STANDART ÖLÇÜ</span><span style="grid-column:span 2">{todo('standart ölçüler')}</span></div>
<div class="row"><span>KASA / PERVAZ</span><span style="grid-column:span 2">{todo('kasa ve pervaz seçenekleri')}</span></div>
<div class="row"><span>GARANTİ</span><span style="grid-column:span 2">“Garantili ürün” — işletmenin ifadesi<br>{todo('süre ve kapsam')}</span></div>
<div class="row"><span>TOPTAN MİN.</span><span style="grid-column:span 2">{todo('toptan minimum adet')}</span></div>
<p class="mono-s soft" style="margin-top:16px">Fiyat için teklif alın · fiyat bilgisi WhatsApp’tan</p></div></div>
</div></div></section>

<section class="blk"><div class="wrap">{sh('04 — ÖZEL ÜRETİM','ÖLÇÜ → TESLİM')}
<div class="intro" style="margin-bottom:56px"><h2 class="display h2">Ölçünüzden başlar, cilayla biter.</h2><p class="soft">Aklınızdaki işi ve ölçüsünü anlatın; atölyede çizip oyuyoruz. Üretim süresi: {todo('ortalama süre')}</p></div>
<div class="proc">
<div class="step"><div class="dot">01</div><h4>Ölçü</h4><p>Yerin ve işin ölçüsü alınır. Ölçü alma hizmeti: {todo('bölgeler')}</p></div>
<div class="step"><div class="dot">02</div><h4>Çizim</h4><p>Parça, ölçüleriyle kâğıda çizilir; birlikte netleştirilir.</p></div>
<div class="step"><div class="dot">03</div><h4>Oyma</h4><p>Desen elde, bıçakla ahşaba işlenir.</p></div>
<div class="step"><div class="dot">04</div><h4>Cila</h4><p>Yüzey hazırlanır, cila ya da boya atılır. Seçenekler: {todo('cila')}</p></div>
<div class="step"><div class="dot">05</div><h4>Teslim</h4><p>Teslimat ve montaj: {todo('bölgeler')}</p></div>
</div></div></section>

<section class="blk dark atolye"><div class="wrap">{sh('05 — ATÖLYE','BÜYÜK SANAYİ, GAZİMAĞUSA')}
<div class="g">{ph('hands-carving-1x1','1:1','1600×1600','Eller ve oyma bıçağı, işin üstünde,<br>yakından — yüz gerekmez','aspect-ratio:1/1',dark=True)}
<div><blockquote>“Tamamıyla <em>el oyması</em>, el emeği.”</blockquote><div class="src">İŞLETMENİN KENDİ PAYLAŞIMINDAN · EYLÜL 2023</div>
<div class="story"><div><span class="k">USTA</span><span class="todo on-dark">[SAHİP DOLDURACAK: ustanın adı ve hikâyesi]</span></div><div><span class="k">KURULUŞ</span><span class="todo on-dark">[SAHİP DOLDURACAK: kuruluş yılı]</span></div></div>
<div style="margin-top:36px"><a class="btn btn-l">Atölyeyi tanıyın {ic('arrow')}</a></div></div></div></div></section>

<section class="blk contact"><div class="wrap">{sh('06 — İLETİŞİM')}
<div class="g"><div><h2 class="display">Ölçünüzü söyleyin, gerisini atölyede konuşalım.</h2>
<p class="soft" style="font-size:18px;margin-top:28px;max-width:520px">Tek parça bir sandık, on adet kapı ya da ölçüye göre bir dolap — WhatsApp’tan yazın ya da teklif listenizi gönderin.</p></div>
<div class="card"><span class="mono soft">TELEFON · WHATSAPP</span><div class="phone">+90 533 833 64 81</div>
<div class="btns"><a class="btn btn-p">WhatsApp’tan yazın {ic('msg')}</a><a class="btn btn-g">Arayın {ic('phone')}</a></div>
<dl><div><dt>ADRES</dt><dd>Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs<br>{todo('açık adres ve harita konumu')}</dd></div><div><dt>SAATLER</dt><dd>{todo('çalışma saatleri')}</dd></div></dl></div>
</div></div></section>
</main>''' + FOOTER
open('anasayfa-1440.html','w').write(page('Sezer Usta Mobilya — Gazimağusa',body,extra_css=css))

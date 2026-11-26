from parcalar import *
from kapi_cizim import door_svg
css=r'''
.crumb{padding:28px 0 0;display:flex;gap:10px;font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;color:var(--ink-soft)}
.crumb b{color:var(--ink);font-weight:500}
.ttl{display:flex;justify-content:space-between;align-items:flex-end;padding:26px 0 34px;border-bottom:1px solid var(--line)}
.ttl h1{font-size:84px}
.ttl h1 .todo{font-size:15px;vertical-align:middle;margin-left:12px;letter-spacing:0}
.seg{display:inline-flex;border:1px solid var(--ink);border-radius:3px;overflow:hidden}
.seg a{padding:0 22px;height:44px;display:flex;align-items:center;font-weight:600;font-size:14px}
.seg a.on{background:var(--walnut);color:var(--shaving)}
.cfg{display:grid;grid-template-columns:minmax(0,7.4fr) minmax(0,4.6fr);gap:0;border-bottom:1px solid var(--line)}
.board{background:var(--oak);border-right:1px solid var(--line);padding:30px 34px 34px;background-image:linear-gradient(rgba(33,27,22,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(33,27,22,.06) 1px,transparent 1px),linear-gradient(rgba(33,27,22,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(33,27,22,.035) 1px,transparent 1px);background-size:80px 80px,80px 80px,16px 16px,16px 16px}
.board .bh{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.board .note{display:flex;gap:10px;align-items:center;margin-top:8px;font-size:14px;color:var(--ink-soft)}
.legend{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px;margin-top:22px;padding:18px 20px;background:rgba(250,246,239,.7);border:1px solid var(--line);font-size:13.5px}
.legend div{display:flex;align-items:center;gap:12px}
.aria{margin-top:18px;border-top:1px dashed #B9A587;padding-top:14px}.aria p{font-size:14px;margin-top:4px}
.board .note{margin-top:18px}
.panel{background:var(--linen);padding:8px 36px 36px}
.st{padding:26px 0;border-bottom:1px solid var(--line)}
.st:last-child{border-bottom:0}
.st .h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px}
.st .h .n{font-family:var(--f-mono);font-size:11px;letter-spacing:.12em;font-weight:500}
.st .h .v{font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;color:var(--ink-soft)}
.st h3{font-family:var(--f-serif);font-weight:400;font-size:22px;margin:-6px 0 14px}
.sel{height:52px;border:1px solid var(--ink);border-radius:3px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;background:var(--shaving)}
.dims{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.num label{display:block;font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft);margin-bottom:6px}
.num .box{height:56px;border:1px solid var(--ink);border-radius:3px;display:grid;grid-template-columns:44px 1fr 44px;align-items:center;background:var(--shaving)}
.num .box span{display:flex;justify-content:center}
.num .box b{font-family:var(--f-mono);font-size:22px;font-weight:500;text-align:center}
.num .box b small{font-size:12px;color:var(--ink-soft);margin-left:4px}
.num .box.focus{outline:2px solid var(--varnish);outline-offset:2px}
.info{display:flex;gap:10px;margin-top:14px;font-size:13.5px;color:var(--ink-soft);line-height:1.45}
.open{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.open a{border:1px solid var(--line);border-radius:3px;padding:12px 6px 10px;text-align:center;font-size:12.5px;font-weight:500;background:var(--shaving)}
.open a.on{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink);background:var(--linen)}
.open svg{display:block;margin:0 auto 8px;width:44px;height:58px}
.sw{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
.sw i{aspect-ratio:1;border:1px dashed #B9A587;border-radius:3px;background:repeating-linear-gradient(45deg,transparent 0 5px,rgba(166,140,108,.22) 5px 6px)}
.opt{display:flex;flex-direction:column;gap:8px}
.opt div{display:flex;justify-content:space-between;align-items:center;border:1px solid var(--line);border-radius:3px;padding:12px 14px;font-size:14.5px;background:var(--shaving)}
.opt div .k{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.1em;color:var(--ink-soft);width:110px}
.qty{display:flex;align-items:center;gap:16px}
.qty .box{height:52px;width:150px;border:1px solid var(--ink);border-radius:3px;display:grid;grid-template-columns:44px 1fr 44px;align-items:center;background:var(--shaving)}
.qty .box span{display:flex;justify-content:center}.qty b{font-family:var(--f-mono);font-size:20px;font-weight:500;text-align:center}
.sum{position:relative;background:var(--walnut);color:var(--shaving);margin-top:0}
.sum .wrap{display:flex;align-items:center;justify-content:space-between;height:96px;gap:24px}
.sum .t{font-family:var(--f-mono);font-size:12px;letter-spacing:.08em;line-height:1.7}
.sum .t span{color:rgba(242,234,223,.6)}
.sum .b{display:flex;gap:10px}
.below{padding:96px 0 120px;display:grid;grid-template-columns:repeat(3,1fr);gap:48px}
.below h4{font-family:var(--f-display);font-size:34px;font-weight:400;line-height:1.05;margin:14px 0 10px}
.below p{font-size:15px;color:var(--ink-soft)}
'''
def oi(hinge_right,inward):
    hx=46 if hinge_right else 10; ox=10 if hinge_right else 46; wy=30
    ty=wy-36 if inward else wy+36
    sweep={(True,True):0,(False,True):1,(True,False):1,(False,False):0}[(hinge_right,inward)]
    return f'''<svg viewBox="0 -8 56 76"><rect x="0" y="{wy-2}" width="10" height="5" fill="#211B16"/><rect x="46" y="{wy-2}" width="10" height="5" fill="#211B16"/>
<path d="M{hx} {wy}V{ty}" stroke="#211B16" stroke-width="2.6"/><path d="M{hx} {ty}A36 36 0 0 {sweep} {ox} {wy}" fill="none" stroke="#A8662E" stroke-dasharray="3 3"/><circle cx="{hx}" cy="{wy}" r="2" fill="#211B16"/></svg>'''
def opening(lbl,hr,inw,on=False):
    return f'<a class="{"on" if on else ""}">{oi(hr,inw)}{lbl}</a>'
body=header(0)+f'''<main><div class="wrap">
<div class="crumb"><span>ANA SAYFA</span>/<span>ÜRÜNLER</span>/<span>MELAMİN KAPI</span>/<b>YAPILANDIRICI</b></div>
<div class="ttl"><div><span class="mono soft">KAPI YAPILANDIRICI · TOPTAN + PERAKENDE</span><h1 class="display" style="margin-top:14px">Melamin kapı{todo('model adı')}</h1></div>
<div style="text-align:right"><div class="mono-s soft" style="margin-bottom:10px">MALZEME</div><div class="seg"><a class="on">Melamin</a><a>PVC</a></div></div></div>
</div>
<div class="wrap" style="padding:0 var(--pad)"><div class="cfg">
<div class="board"><div class="bh"><span class="mono">ÖN GÖRÜNÜŞ · CANLI ÇİZİM</span><span class="badge wait">Ölçüler örnektir</span></div>
{door_svg(True)}
<div class="legend"><div><svg width="34" height="10"><path d="M0 5H34" stroke="#A8662E" stroke-dasharray="6 5"/></svg>Açılım çizgisi — ucu menteşe tarafını gösterir</div><div><svg width="34" height="12"><rect x="14" y="0" width="6" height="12" fill="#211B16"/></svg>Menteşe</div><div><svg width="34" height="12"><rect x="0" y="1" width="34" height="10" fill="#4A3426"/></svg>Sizin girdiğiniz ölçü</div><div><svg width="34" height="10"><rect x="0" y="0" width="34" height="10" fill="url(#hat2)" stroke="#211B16" stroke-width=".8"/><defs><pattern id="hat2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" stroke="#211B16" stroke-width=".8"/></pattern></defs></svg>Duvar / zemin kesiti</div></div>
<div class="note">{ic('info')} Ölçü aralıkları örnektir; kesin ölçüler için teklif alın. Çizim ölçüye göre orantılı güncellenir.</div>
<div class="aria"><span class="mono-s soft">EKRAN OKUYUCU ÖZETİ</span><p>“Melamin kapı, 90 × 210 cm, sağdan içe açılır, renk seçilmedi.”</p></div></div>
<div class="panel">
<div class="st"><div class="h"><span class="n">01 — MODEL</span><span class="v">MELAMİN</span></div>
<div class="sel"><span>{todo('model / seri adları')}</span>{ic('down')}</div></div>
<div class="st"><div class="h"><span class="n">02 — ÖLÇÜ</span><span class="v">CM · KANAT ÖLÇÜSÜ</span></div>
<div class="dims"><div class="num"><label>GENİŞLİK (E)</label><div class="box focus"><span>{ic('minus')}</span><b>90<small>cm</small></b><span>{ic('plus')}</span></div></div>
<div class="num"><label>YÜKSEKLİK (B)</label><div class="box"><span>{ic('minus')}</span><b>210<small>cm</small></b><span>{ic('plus')}</span></div></div></div>
<div class="info">{ic('info')}<span>Değerler örnektir. Standart ölçüler ve en küçük / en büyük ölçü: {todo('ölçü aralıkları')}</span></div></div>
<div class="st"><div class="h"><span class="n">03 — AÇILIM YÖNÜ</span><span class="v">İÇTEN BAKIŞ</span></div>
<div class="open">{opening('Soldan içe',False,True)}{opening('Sağdan içe',True,True,True)}{opening('Soldan dışa',False,False)}{opening('Sağdan dışa',True,False)}</div></div>
<div class="st"><div class="h"><span class="n">04 — RENK / DESEN</span><span class="v">SEÇİLMEDİ</span></div>
<div class="sw"><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="info">{ic('info')}<span>Kartela işletmeden gelecek: {todo('renk ve desen kartelası')}</span></div></div>
<div class="st"><div class="h"><span class="n">05 — KASA · KULP · KİLİT</span><span class="v">AKSESUAR</span></div>
<div class="opt"><div><span class="k">KASA / PERVAZ</span><span>{todo('seçenekler')}</span></div><div><span class="k">KULP / KOL</span><span>{todo('seçenekler')}</span></div><div><span class="k">KİLİT</span><span>{todo('seçenekler')}</span></div></div></div>
<div class="st"><div class="h"><span class="n">06 — ADET</span><span class="v">TOPTAN İŞARETİ OTOMATİK</span></div>
<div class="qty"><div class="box"><span>{ic('minus')}</span><b>1</b><span>{ic('plus')}</span></div><span style="font-size:13.5px;color:var(--ink-soft);line-height:1.45">Toptan en az {todo('adet')} — bu adedin üstü “toptan talep” olarak işaretlenir.</span></div></div>
</div></div></div>
<div class="sum"><div class="wrap"><div class="t">MELAMİN · <span>MODEL —</span> · E 90 × B 210 CM <span>(ÖRNEK)</span> · SAĞDAN İÇE · <span>RENK SEÇİLMEDİ</span> · 1 ADET<br><span>FİYAT İÇİN TEKLİF ALIN · ÇİZİM TEKLİFE EKLENİR</span></div>
<div class="b"><a class="btn btn-gd btn-s">{ic('copy')} Bağlantıyı kopyala</a><a class="btn btn-gd btn-s">{ic('dl')} Çizimi PNG indir</a><a class="btn btn-l">{ic('plus')} Teklif listesine ekle</a></div></div></div>
<div class="wrap"><div class="below">
<div><span class="mono soft">ÖLÇÜ REHBERİ</span><h4>Kapı ölçüsü nasıl alınır?</h4><p>Duvar boşluğunu üç noktadan ölçmek için adım adım çizimli rehber.</p></div>
<div><span class="mono soft">TOPTAN</span><h4>Müteahhit ve toplu alım</h4><p>Birden fazla ölçüyü listeye ekleyin; talep toptan olarak işaretlenir. Minimum adet: {todo('adet')}</p></div>
<div><span class="mono soft">GARANTİ</span><h4>“Garantili ürün.”</h4><p>İşletmenin kendi ifadesi. Süre ve kapsam: {todo('garanti süresi ve kapsamı')}</p></div>
</div></div>
</main>'''+FOOTER
open('kapi-yapilandirici-1440.html','w').write(page('Melamin kapı yapılandırıcı — Sezer Usta Mobilya',body,extra_css=css))

from parcalar import *
from kapi_cizim import door_svg
import re
k=open('kapi.py').read()
exec(k[k.index('def oi('):k.index('body=')])  # oi, opening
css=re.search(r"css=r'''(.*?)'''",k,re.S).group(1)+r'''
body{padding-bottom:118px}
.ttl{display:block;padding:18px 0 22px}
.ttl h1{font-size:54px;line-height:.95}
.ttl h1 .todo{display:inline-block;margin:10px 0 0;font-size:11px;white-space:normal}
.seg{display:grid;grid-template-columns:1fr 1fr;width:100%;margin-top:18px}.seg a{justify-content:center}
.board{padding:16px 12px 16px;border-right:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:0 -20px}
.panel{padding:0 0 8px;background:transparent}
.st{padding:22px 0}
.open{grid-template-columns:repeat(4,1fr);gap:6px}.open a{font-size:11px;padding:8px 2px}
.open svg{width:34px;height:46px}
.sw{gap:7px}
.opt div{flex-direction:column;align-items:flex-start;gap:6px}
.qty{flex-direction:column;align-items:flex-start;gap:10px}
.msum{position:fixed;left:0;right:0;bottom:0;background:var(--walnut);color:var(--shaving);padding:12px 16px 16px;z-index:20}
.msum .t{font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;margin-bottom:10px;display:flex;justify-content:space-between}
.msum .t span{color:rgba(242,234,223,.6)}
.msum .r{display:grid;grid-template-columns:48px 48px 1fr;gap:8px}
.msum .r a{height:48px;border-radius:3px;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:14.5px;border:1px solid rgba(242,234,223,.4)}
.msum .r a.p{background:var(--shaving);color:var(--walnut);border-color:var(--shaving)}
.todo{white-space:normal}
'''
body=mheader(0)+f'''<main><div class="wrap">
<div class="ttl"><span class="mono-s soft">KAPI YAPILANDIRICI · TOPTAN + PERAKENDE</span><h1 class="display" style="margin-top:12px">Melamin kapı<br>{todo('model adı')}</h1>
<div class="seg"><a class="on">Melamin</a><a>PVC</a></div></div>
<div class="board"><div class="bh" style="padding:0 6px"><span class="mono-s">ÖN GÖRÜNÜŞ · 1:20</span><span class="badge wait" style="font-size:9.5px">Ölçüler örnektir</span></div>
{door_svg(False)}
<div class="note" style="padding:0 6px;font-size:12.5px;margin-top:4px">{ic('info')} Sağdan içe açılır · çizim ölçüye göre güncellenir.</div></div>
<div class="panel">
<div class="st"><div class="h"><span class="n">01 — MODEL</span></div><div class="sel"><span>{todo('model / seri adları')}</span>{ic('down')}</div></div>
<div class="st"><div class="h"><span class="n">02 — ÖLÇÜ</span><span class="v">CM</span></div>
<div class="dims"><div class="num"><label>GENİŞLİK (E)</label><div class="box focus"><span>{ic('minus')}</span><b>90</b><span>{ic('plus')}</span></div></div>
<div class="num"><label>YÜKSEKLİK (B)</label><div class="box"><span>{ic('minus')}</span><b>210</b><span>{ic('plus')}</span></div></div></div>
<div class="info">{ic('info')}<span>Ölçü aralıkları örnektir; kesin ölçüler için teklif alın. {todo('ölçü aralıkları')}</span></div></div>
<div class="st"><div class="h"><span class="n">03 — AÇILIM YÖNÜ</span></div>
<div class="open">{opening('Soldan içe',False,True)}{opening('Sağdan içe',True,True,True)}{opening('Soldan dışa',False,False)}{opening('Sağdan dışa',True,False)}</div></div>
<div class="st"><div class="h"><span class="n">04 — RENK / DESEN</span><span class="v">SEÇİLMEDİ</span></div><div class="sw"><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="info">{ic('info')}<span>{todo('renk ve desen kartelası')}</span></div></div>
<div class="st"><div class="h"><span class="n">05 — KASA · KULP · KİLİT</span></div>
<div class="opt"><div><span class="k">KASA / PERVAZ</span><span>{todo('seçenekler')}</span></div><div><span class="k">KULP / KOL</span><span>{todo('seçenekler')}</span></div><div><span class="k">KİLİT</span><span>{todo('seçenekler')}</span></div></div></div>
<div class="st"><div class="h"><span class="n">06 — ADET</span></div><div class="qty"><div class="box"><span>{ic('minus')}</span><b>1</b><span>{ic('plus')}</span></div><span style="font-size:13px;color:var(--ink-soft)">Toptan en az {todo('adet')} — üstü “toptan talep” olarak işaretlenir.</span></div></div>
</div></div></main>{FOOTER}
<div class="msum"><div class="t"><b style="font-weight:500">E 90 × B 210 · SAĞDAN İÇE · 1 AD.</b><span>ÖRNEK</span></div>
<div class="r"><a aria-label="Bağlantıyı kopyala">{ic('copy')}</a><a aria-label="Çizimi indir">{ic('dl')}</a><a class="p">{ic('plus')} Teklif listesine ekle</a></div></div>'''
open('kapi-yapilandirici-390.html','w').write(page('Kapı yapılandırıcı',body,True,css))

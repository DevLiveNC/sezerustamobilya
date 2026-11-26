from parcalar import *
css=r'''
body{padding-bottom:0}
.todo{white-space:normal}
.ttl{padding:22px 0 26px}
.ttl h1{font-size:56px;line-height:.95;margin:12px 0 12px}
.steps{display:flex;gap:6px;margin-top:18px}
.steps span{flex:1;height:30px;border-top:2px solid var(--line);font-family:var(--f-mono);font-size:10px;letter-spacing:.08em;padding-top:6px;color:var(--ink-soft)}
.steps span.on{border-color:var(--walnut);color:var(--ink)}
.box{background:var(--linen);border:1px solid var(--line);margin:0 -4px}
.box .hd{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--line)}
.line{display:grid;grid-template-columns:54px 1fr auto;gap:12px;padding:14px 16px;border-bottom:1px solid var(--line);align-items:start}
.line:last-child{border-bottom:0}
.line .ph{width:54px;height:66px}
.line .ph .lbl,.line .ph .tag,.line .ph .tag-r{display:none}
.line .ph .cm{display:none}
.line h4{font-family:var(--f-serif);font-weight:400;font-size:16.5px;line-height:1.25}
.line .m{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.04em;color:var(--ink-soft);margin-top:5px;line-height:1.55}
.line .x{color:var(--ink-soft)}
.doorth{width:54px;height:66px;border:1px solid var(--line);background:var(--oak);display:flex;align-items:center;justify-content:center}
.qty{display:inline-flex;align-items:center;gap:10px;margin-top:8px;border:1px solid var(--line);border-radius:3px;padding:2px 6px;font-family:var(--f-mono);font-size:13px}
.qty .ico{width:15px;height:15px}
form{margin-top:36px}
.f{margin-bottom:18px}
.f label{display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:7px}
.f label span{font-family:var(--f-mono);font-size:10px;letter-spacing:.08em;font-weight:400;color:var(--ink-soft);padding-top:3px}
.in{height:52px;border:1px solid #BCA88A;border-radius:3px;background:var(--linen);display:flex;align-items:center;padding:0 14px;font-size:16px}
.in.ph-t{color:#9A8A79}
.in.err{border-color:var(--danger);box-shadow:inset 0 0 0 1px var(--danger)}
.in .pre{font-family:var(--f-mono);font-size:14px;color:var(--ink-soft);padding-right:10px;margin-right:10px;border-right:1px solid var(--line);height:100%;display:flex;align-items:center}
.emsg{display:flex;gap:7px;color:var(--danger);font-size:13px;margin-top:7px;line-height:1.4}
.emsg .ico{width:15px;height:15px;margin-top:2px}
.ta{height:120px;align-items:flex-start;padding-top:14px}
.seg2{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--ink);border-radius:3px;overflow:hidden}
.seg2 a{height:48px;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:14px}
.seg2 a.on{background:var(--walnut);color:var(--shaving)}
.chk{display:grid;grid-template-columns:24px 1fr;gap:12px;font-size:14px;line-height:1.45;padding:14px 0;border-top:1px solid var(--line)}
.chk i{width:22px;height:22px;border:1.5px solid var(--ink);border-radius:2px;display:flex;align-items:center;justify-content:center;background:var(--linen)}
.chk i.on{background:var(--walnut);border-color:var(--walnut);color:var(--shaving)}
.chk i .ico{width:15px;height:15px;stroke-width:2.2}
.drop{border:1.5px dashed #B9A587;border-radius:3px;padding:18px;text-align:center;background:rgba(250,246,239,.6)}
.drop .ico{width:24px;height:24px;margin:0 auto 6px;display:block}
.thumbs{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:10px}
.thumbs i{aspect-ratio:1;border:1px solid var(--line);background:var(--oak);display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:10px;color:var(--ink-soft);font-style:normal}
.submit{margin-top:22px}
.submit .btn{width:100%;height:56px;font-size:16px}
.after{margin-top:14px;font-size:13px;color:var(--ink-soft);line-height:1.5;display:flex;gap:8px}
.wa{margin-top:34px;background:var(--walnut);color:var(--shaving);padding:20px 18px;margin-left:-20px;margin-right:-20px}
.wa .bub{background:var(--linen);color:var(--ink);border-radius:3px;padding:14px;font-family:var(--f-mono);font-size:11.5px;line-height:1.65;margin-top:12px;letter-spacing:.01em}
'''
door_th='<svg width="30" height="52" viewBox="0 0 30 52"><rect x="1" y="1" width="28" height="50" fill="#FAF6EF" stroke="#211B16"/><path d="M3 3L26 26L3 49" fill="none" stroke="#A8662E" stroke-dasharray="2 2"/><rect x="5" y="25" width="7" height="2" fill="#211B16"/></svg>'
body=mheader(3)+f'''<main><div class="wrap">
<div class="ttl"><span class="mono-s soft">TEKLİF · /TEKLİF</span><h1 class="display">Teklif isteyin.</h1>
<p class="soft" style="font-size:15.5px">Listenizi ve iletişim bilginizi bırakın; talebiniz WhatsApp’a hazır mesaj olarak da oluşur. Fiyat bilgisi sizinle konuşularak verilir.</p>
<div class="steps"><span class="on">01 LİSTE</span><span class="on">02 BİLGİLER</span><span>03 GÖNDER</span></div></div>
<div class="box"><div class="hd"><span class="mono">LİSTE · 2 KALEM · 3 ADET</span><span class="mono-s soft">DÜZENLE</span></div>
<div class="line"><div class="ph"><i class="cm tl"></i></div><div><h4>El oyması sandık — örnek kayıt</h4><div class="m">TEK PARÇA · 1 ADET<br>ÖLÇÜ: İŞLETMEDEN BEKLENİYOR</div></div><span class="x">{ic('x','ico','width:16px;height:16px')}</span></div>
<div class="line"><div class="doorth">{door_th}</div><div><h4>Melamin kapı</h4><div class="m">MODEL: {todo('model')}<br>E 90 × B 210 CM · SAĞDAN İÇE<br>RENK: SEÇİLMEDİ · KASA: —</div><span class="qty">{ic('minus')} 2 {ic('plus')}</span></div><span class="x">{ic('x','ico','width:16px;height:16px')}</span></div>
</div>
<p class="mono-s soft" style="margin-top:10px">ÖRNEK KALEMLER · ÖLÇÜLER ÖRNEKTİR</p>
<form>
<div class="f"><label>Ad soyad</label><div class="in ph-t">Adınız ve soyadınız</div></div>
<div class="f"><label>Telefon <span>KUZEY KIBRIS / TÜRKİYE</span></label><div class="in err"><span class="pre">+90</span>533 12</div>
<div class="emsg">{ic('alert')}<span>Telefon numarası eksik görünüyor. Örnek: 533 123 45 67</span></div></div>
<div class="f"><label>E-posta <span>İSTEĞE BAĞLI</span></label><div class="in ph-t">ornek@eposta.com</div></div>
<div class="f"><label>Şehir / bölge</label><div class="in ph-t" style="justify-content:space-between">Seçin — Gazimağusa, Lefkoşa…{ic('down')}</div></div>
<div class="f"><label>Size nasıl dönelim?</label><div class="seg2"><a class="on">{ic('msg')} WhatsApp</a><a>{ic('phone')} Arama</a></div></div>
<div class="f"><label>Mesajınız <span>İSTEĞE BAĞLI</span></label><div class="in ta ph-t">Ölçü, adet, teslim yeri ya da aklınızdaki iş…</div></div>
<div class="f"><label>Fotoğraf ekleyin <span>EN FAZLA 5</span></label><div class="drop">{ic('cam')}<b style="font-size:14px">Fotoğraf seçin ya da çekin</b><div class="mono-s soft" style="margin-top:4px">JPG · HEIC · PNG — boşluk, eski kapı, örnek iş</div></div>
<div class="thumbs"><i>1</i><i>2</i><i style="border-style:dashed;background:transparent">+</i><i style="border-style:dashed;background:transparent"></i><i style="border-style:dashed;background:transparent"></i></div></div>
<div class="chk"><i class="on">{ic('check')}</i><span><b>Toptan talep</b><br><span class="soft">Müteahhit, otel ya da toplu alım. Minimum adet: {todo('toptan minimum adet')}</span></span></div>
<div class="chk"><i></i><span>Bilgilerimin teklif için kullanılmasını kabul ediyorum. <u>KVKK aydınlatma metni</u> <span class="mono-s soft">(TASLAK)</span></span></div>
<div class="submit"><a class="btn btn-p">Teklif talebini hazırla {ic('arrow')}</a></div>
<div class="after">{ic('info')}<span>Gönderince talebiniz kaydedilir ve +90 533 833 64 81 numarasına gidecek WhatsApp mesajınız hazır olur.</span></div>
</form>
<div class="wa"><span class="mono-s" style="opacity:.7">GÖNDERİM SONRASI · WHATSAPP ÖNİZLEMESİ</span>
<div class="bub">Merhaba, web sitenizden teklif istiyorum.<br>1) El oyması sandık — örnek kayıt (sayfa bağlantısı)<br>2) Melamin kapı · 90×210 cm · sağdan içe · 2 adet<br>Toptan: evet · Dönüş: WhatsApp<br>Ad: (formdaki adınız) · Tel: (formdaki numara)</div>
<a class="btn btn-l" style="width:100%;margin-top:14px">{ic('msg')} WhatsApp’ta aç</a></div>
</div></main>{FOOTER}'''
open('teklif-formu-390.html','w').write(page('Teklif — Sezer Usta Mobilya',body,True,css))

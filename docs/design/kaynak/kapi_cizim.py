# Kapı ön görünüş çizimi (SVG) — yapılandırıcı için
INK='#211B16'; VAR='#A8662E'; VT='#4A3426'; SOFT='#6A5D50'; LINE='#D3C2A8'; LIN='#FAF6EF'
def arrow_h(x1,x2,y):
    return f'<path d="M{x1} {y}H{x2}" stroke="{INK}"/><path d="M{x1} {y}l9 -3.5v7zM{x2} {y}l-9 -3.5v7z" fill="{INK}"/>'
def arrow_v(x,y1,y2):
    return f'<path d="M{x} {y1}V{y2}" stroke="{INK}"/><path d="M{x} {y1}l-3.5 9h7zM{x} {y2}l-3.5 -9h7z" fill="{INK}"/>'
def mono(x,y,t,size=11,fill=INK,anchor='middle',ls='.08em',w=400,extra=''):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="IBM Plex Mono" font-size="{size}" font-weight="{w}" fill="{fill}" letter-spacing="{ls}" {extra}>{t}</text>'
def door_svg(full=True):
    L,T,W,H=170,92,252,588  # 90x210 @2.8px/cm
    F=16; floor=T+H
    s=[f'<svg viewBox="0 0 {780 if full else 470} {800 if full else 790}" width="100%" style="display:block" font-family="IBM Plex Mono">']
    s.append('<defs><pattern id="hat" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="#211B16" stroke-width=".8"/></pattern></defs>')
    # floor
    s.append(f'<path d="M60 {floor}H{460 if full else 450}" stroke="{INK}" stroke-width="1.4"/><rect x="60" y="{floor}" width="{400 if full else 390}" height="10" fill="url(#hat)" opacity=".35"/>')
    # frame
    s.append(f'<path d="M{L-F} {floor}V{T-F}H{L+W+F}V{floor}" fill="none" stroke="{INK}" stroke-width="1.4"/><path d="M{L} {floor}V{T}H{L+W}V{floor}" fill="none" stroke="{INK}" stroke-width="1"/>')
    s.append(f'<rect x="{L+2}" y="{T+2}" width="{W-4}" height="{H-2}" fill="{LIN}" stroke="{INK}" stroke-width=".8"/>')
    # swing indication (apex to hinge side = right)
    s.append(f'<path d="M{L+4} {T+4}L{L+W-6} {T+H/2}L{L+4} {floor-2}" fill="none" stroke="{VAR}" stroke-width="1" stroke-dasharray="6 5"/>')
    # hinges
    for hy in (T+60,T+H/2-10,floor-90): s.append(f'<rect x="{L+W-5}" y="{hy}" width="7" height="26" fill="{INK}"/>')
    # handle ~105cm from floor
    hy=floor-105*2.8
    s.append(f'<circle cx="{L+26}" cy="{hy}" r="9" fill="none" stroke="{INK}" stroke-width="1.2"/><rect x="{L+22}" y="{hy-3}" width="44" height="6" rx="3" fill="{INK}"/><circle cx="{L+26}" cy="{hy+28}" r="2.6" fill="{INK}"/><path d="M{L+26} {hy+29}v7" stroke="{INK}" stroke-width="2"/>')
    # labels on frame
    s.append(mono(L+W/2,T-F-12,'KASA · [SAHİP DOLDURACAK]',10,SOFT))
    # width dim
    y=floor+52
    s.append(f'<path d="M{L} {floor+14}V{y+10}M{L+W} {floor+14}V{y+10}" stroke="{INK}" stroke-width=".8"/>'+arrow_h(L,L+W,y))
    s.append(f'<rect x="{L+W/2-58}" y="{y-12}" width="116" height="24" fill="{VT}"/>'+mono(L+W/2,y+4.5,'E 90 cm',12.5,LIN,w=600))
    s.append(mono(L+W/2,y+34,'GENİŞLİK · ÖRNEK',9.5,SOFT))
    # height dim
    x=L-F-48
    s.append(f'<path d="M{L-F-10} {T}H{x-10}M{L-F-10} {floor}H{x-10}" stroke="{INK}" stroke-width=".8"/>'+arrow_v(x,T,floor))
    cy=T+H/2
    s.append(f'<rect x="{x-12}" y="{cy-60}" width="24" height="120" fill="{VT}"/><text transform="translate({x+4.5} {cy}) rotate(-90)" text-anchor="middle" font-family="IBM Plex Mono" font-size="12.5" font-weight="600" fill="{LIN}" letter-spacing=".08em">B 210 cm</text>')
    # handle height
    if full: s.append(f'<path d="M{L+70} {hy}H{L+80}" stroke="{SOFT}" stroke-width=".7" stroke-dasharray="2 3"/>'+mono(L+84,hy+4,'KOL · [SAHİP DOLDURACAK]',9,SOFT,'start',ls='0'))
    if full:
        # plan inset
        px,py=500,92
        s.append(f'<rect x="{px}" y="{py}" width="240" height="250" fill="{LIN}" stroke="{INK}" stroke-width=".8"/>')
        s.append(mono(px+14,py+24,'PLAN · AÇILIM YÖNÜ',10,INK,'start',w=500))
        wy=py+180
        s.append(f'<rect x="{px+14}" y="{wy}" width="44" height="16" fill="url(#hat)" stroke="{INK}" stroke-width=".8"/><rect x="{px+182}" y="{wy}" width="44" height="16" fill="url(#hat)" stroke="{INK}" stroke-width=".8"/>')
        hx=px+182; R=124
        s.append(f'<path d="M{hx} {wy}V{wy-R}" stroke="{INK}" stroke-width="3"/>')
        s.append(f'<path d="M{hx} {wy-R}A{R} {R} 0 0 0 {hx-R} {wy}" fill="none" stroke="{VAR}" stroke-width="1" stroke-dasharray="4 4"/>')
        s.append(f'<circle cx="{hx}" cy="{wy}" r="3" fill="{INK}"/>')
        s.append(mono(px+120,wy+40,'İÇ ↑   ·   DIŞ ↓',9.5,SOFT))
        s.append(mono(px+120,wy+58,'SAĞDAN İÇE AÇILIR',10.5,VT,w=600))
        # title block
        tx,ty,tw=500,560,240
        rows=[('PROJE','Sezer Usta Mobilya'),('ÇİZİM','Kapı ön görünüş'),('MALZEME','Melamin'),('MODEL','[SAHİP DOLDURACAK]'),('ÖLÇEK','1:20 · ÖRNEK ÖLÇÜ')]
        s.append(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{len(rows)*24}" fill="{LIN}" stroke="{INK}" stroke-width=".9"/>')
        for i,(k,v) in enumerate(rows):
            yy=ty+i*24
            if i: s.append(f'<path d="M{tx} {yy}H{tx+tw}" stroke="{LINE}"/>')
            s.append(mono(tx+10,yy+16,k,9,SOFT,'start'))
            s.append(mono(tx+80,yy+16,v,10,VT if 'SAHİP' in v else INK,'start',ls='.02em',w=500))
        s.append(f'<path d="M{tx+72} {ty}V{ty+len(rows)*24}" stroke="{LINE}"/>')
        # scale bar
        sx,sy=500,500
        for i in range(5):
            s.append(f'<rect x="{sx+i*28}" y="{sy}" width="28" height="6" fill="{INK if i%2==0 else LIN}" stroke="{INK}" stroke-width=".8"/>')
        s.append(mono(sx,sy+22,'0',9,SOFT,'start')+mono(sx+140,sy+22,'50 cm',9,SOFT,'end'))
    s.append('</svg>')
    return ''.join(s)

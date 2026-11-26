from parcalar import *
css=r'''
.e{padding:110px 0 150px;display:grid;grid-template-columns:7fr 5fr;gap:80px;align-items:center}
.e h1{font-size:150px;line-height:.9;margin:26px 0 30px}
.e h1 em{font-style:italic;color:var(--walnut)}
.e p{font-size:19px;max-width:520px}
.links{margin-top:44px;border-top:1px solid var(--ink)}
.links a{display:grid;grid-template-columns:60px 1fr auto;align-items:center;padding:18px 0;border-bottom:1px solid var(--line);font-family:var(--f-display);font-size:30px;line-height:1}
.links a .i{font-family:var(--f-mono);font-size:11px;letter-spacing:.12em;color:var(--ink-soft)}
.plate{background:var(--linen);border:1px solid var(--line);padding:28px}
'''
svg='''<svg viewBox="0 0 460 520" width="100%" style="display:block">
<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#D3C2A8" stroke-width=".6"/></pattern></defs>
<rect width="460" height="520" fill="url(#g)" opacity=".7"/>
<g stroke="#211B16" fill="none" stroke-width="1.2">
<path d="M60 112 V150"/><path d="M60 130 H196"/><path d="M60 130 l11 -4 v8z" fill="#211B16"/>
<path d="M196 130 l6 -10 l8 20 l6 -10" />
<path d="M262 166 l6 -10 l8 20 l6 -10"/><path d="M282 166 H400"/><path d="M400 148 V186"/><path d="M400 166 l-11 -4 v8z" fill="#211B16"/>
<path d="M226 118 V180" stroke="#A8662E" stroke-dasharray="3 4"/></g>
<rect x="80" y="84" width="104" height="26" fill="#4A3426"/>
<text x="132" y="102" text-anchor="middle" font-family="IBM Plex Mono" font-size="13" font-weight="600" fill="#FAF6EF" letter-spacing="1">E ??? cm</text>
<g fill="none" stroke="#211B16" stroke-width="1.1"><rect x="110" y="230" width="120" height="220"/><rect x="118" y="238" width="104" height="212" stroke-width=".8"/></g>
<g fill="none" stroke="#211B16" stroke-width="1.1" transform="rotate(-9 262 450)"><rect x="262" y="250" width="110" height="200"/></g>
<path d="M120 450 H420" stroke="#211B16" stroke-width="1.4"/>
<text x="30" y="500" font-family="IBM Plex Mono" font-size="10" fill="#6A5D50" letter-spacing="1">ÇİZİM NO. 404 · ÖLÇÜ TUTMADI · 1:∞</text>
<text x="282" y="200" font-family="IBM Plex Mono" font-size="10" fill="#4A3426" letter-spacing="1">HİZA KAYDI</text></svg>'''
body=header()+f'''<main><div class="wrap"><div class="e"><div>{sh('HATA 404','SAYFA BULUNAMADI')}
<h1 class="display">Bu ölçü <em>bizde</em> yok.</h1>
<p class="soft">Aradığınız sayfa taşınmış, satılmış bir parçaya ait ya da hiç var olmamış olabilir. Atölyede başka neler var, buradan bakın.</p>
<div class="links"><a><span class="i">01</span>Ana sayfa{ic('arrow')}</a><a><span class="i">02</span>El oyması tek parçalar{ic('arrow')}</a><a><span class="i">03</span>Kapı yapılandırıcı{ic('arrow')}</a><a><span class="i">04</span>WhatsApp’tan sorun · +90 533 833 64 81{ic('msg')}</a></div></div>
<div class="plate">{svg}</div></div></div></main>'''+FOOTER
open('404-1440.html','w').write(page('Sayfa bulunamadı — Sezer Usta Mobilya',body,extra_css=css))

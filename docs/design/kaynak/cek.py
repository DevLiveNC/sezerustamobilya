import sys, asyncio
from playwright.async_api import async_playwright
async def main(items):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for html,w,out in items:
            pg = await b.new_page(viewport={'width':w,'height':900}, device_scale_factor=1)
            await pg.goto(f'file:///workspace/sezer-usta-mobilya/tasarim/kaynak/{html}')
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(300)
            ov = await pg.evaluate('''()=>{const W=document.documentElement.clientWidth;return [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>W+1&&getComputedStyle(e).position!=='fixed'}).slice(0,5).map(e=>e.className+':'+Math.round(e.getBoundingClientRect().right))}''')
            fonts = await pg.evaluate('[...document.fonts].filter(f=>f.status=="loaded").map(f=>f.family+" "+f.style+" "+f.weight)')
            H = await pg.evaluate('document.documentElement.scrollHeight')
            await pg.set_viewport_size({'width':w,'height':H}); await pg.wait_for_timeout(200)
            await pg.screenshot(path=f'/workspace/sezer-usta-mobilya/tasarim/{out}', full_page=True)
            print(out, 'taşma:', ov or 'yok', '| font:', len(fonts), sorted(set(fonts)))
        await b.close()
a=sys.argv[1:]; asyncio.run(main([(a[i],int(a[i+1]),a[i+2]) for i in range(0,len(a),3)]))

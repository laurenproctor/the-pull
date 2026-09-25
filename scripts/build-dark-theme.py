"""Compile scoped color overrides for the static preview. No runtime dependency.
Run from the repository root after changing its stylesheets.
"""
from pathlib import Path
import re, colorsys
root=Path('.')

def dark_color(hexcolor,kind):
    v=hexcolor.lstrip('#')
    if len(v) in (3,4):v=''.join(c*2 for c in v)
    if len(v) not in (6,8):return hexcolor
    rgb=[int(v[i:i+2],16)/255 for i in (0,2,4)]
    h,l,s=colorsys.rgb_to_hls(*rgb)
    if kind=='bg':
        if l<.42:return hexcolor
        l=.08+.075*l;s=min(s,.14)
    elif kind=='border':l=.28;s=min(s,.17)
    else:
        if l>.72:return hexcolor
        l=.80 if l>.28 else .91;s=min(s,.30)
    color=colorsys.hls_to_rgb(h,l,s)
    return '#'+''.join(f'{round(c*255):02x}' for c in color)+(v[6:] if len(v)==8 else '')

def value_colors(value,kind):
    # Leave photographic data URIs untouched, including any encoded colors.
    if 'url(' in value:return None
    value=re.sub(r'\bwhite\b','#ffffff',value,flags=re.I)
    value=re.sub(r'\bblack\b','#000000',value,flags=re.I)
    def rgba(m):
        vals=m.group(1).split(',')
        if len(vals)<3:return m.group(0)
        try: color='#'+''.join(f'{min(255,max(0,round(float(x)))):02x}' for x in vals[:3])
        except ValueError:return m.group(0)
        d=dark_color(color,kind);rgb=[int(d[i:i+2],16) for i in (1,3,5)]
        return 'rgba('+','.join(map(str,rgb))+','+(vals[3].strip() if len(vals)>3 else '1')+')'
    value=re.sub(r'rgba?\(([^()]*)\)',rgba,value)
    return re.sub(r'#[0-9a-fA-F]{3,8}\b',lambda m:dark_color(m.group(0),kind),value)

def scope(selector):
    selector=selector.strip()
    if selector==':root':return 'html[data-theme="dark"]'
    if selector.startswith('html'):return selector.replace('html','html[data-theme="dark"]',1)
    return 'html[data-theme="dark"] '+selector

def compile_rules(css):
    result=[];pos=0
    while pos<len(css):
        a=css.find('{',pos)
        if a<0:break
        selector=css[pos:a].strip();depth=1;b=a+1
        while b<len(css) and depth:
            if css[b]=='{':depth+=1
            if css[b]=='}':depth-=1
            b+=1
        body=css[a+1:b-1];pos=b
        if selector.startswith('@media') or selector.startswith('@supports'):
            inner=compile_rules(body)
            if inner:result.append(selector+'{'+inner+'}')
        elif not selector.startswith('@'):
            declarations=[]
            for d in body.split(';'):
                if ':' not in d:continue
                prop,val=d.split(':',1);prop=prop.strip();val=val.strip()
                if prop in ('background','background-color'):kind='bg'
                elif prop in ('color','-webkit-text-fill-color'):kind='text'
                elif prop.startswith('border') or prop in ('outline','outline-color'):kind='border'
                elif prop.startswith('--') and any(x in prop for x in ['bg','surface','primary']):kind='bg'
                elif prop.startswith('--') and any(x in prop for x in ['ink','text','muted','success','warn','danger','info']):kind='text'
                elif prop.startswith('--') and 'line' in prop:kind='border'
                else:continue
                if not re.search(r'#[\da-fA-F]{3,8}\b|\brgba?\(|\bwhite\b|\bblack\b',val):continue
                new=value_colors(val,kind)
                if new and new!=val:declarations.append(prop+':'+new)
            if declarations:result.append(','.join(scope(s) for s in selector.split(','))+'{'+(';'.join(declarations))+'}')
    return '\n'.join(result)
# Existing dashboard style, then shared/public and evidence styles in cascade order.
html=(root/'dashboard.html').read_text()
css='\n'.join(re.findall(r'<style>(.*?)</style>',html,re.S))
for name in ['study-evidence.css','observatory-explorer.css','site.css','site-shell.css']:
    css+='\n'+(root/name).read_text()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S)
compiled=compile_rules(css)
# Intentional palette and branded surfaces. Do not invert media or charts.
compiled+='''
html[data-theme="dark"]{--pull-ink:#e1ede4;--pull-paper:#111a17;--pull-lime:#d6f66c;--pull-line:#34473b;--pull-muted:#b8c6bd;--bg:#111a17;--surface:#1a251f;--surface-2:#202e26;--surface-3:#18231d;--ink:#e6eee8;--muted:#b7c5bb;--line:#3b4d40;--line-strong:#526957}
html[data-theme="dark"] body{background:#111a17;color:#e6eee8}
html[data-theme="dark"] :is(input,select,textarea){background-color:#1b2a22;color:#e6eee8;border-color:#506356}
html[data-theme="dark"] :is(input,textarea)::placeholder{color:#a3b6a8}
html[data-theme="dark"] :is(.pull-public .pull-pill,.pull-support .pull-pill){background:#d6f66c;color:#183624;border-color:#d6f66c}
html[data-theme="dark"] .pull-pill.outline{background:transparent;color:#e1ede4;border-color:#8da18f}
html[data-theme="dark"] .pull-dark{background:#092c23;color:#edf4ee}
html[data-theme="dark"] .pull-report{background:#203c30;color:#f0f5f0}
html[data-theme="dark"] .pull-report-tag{background:#2c503c;color:#e2f3df}
html[data-theme="dark"] .pull-float,html[data-theme="dark"] .pull-cookie-badge{background:#d6f66c;color:#183624}
html[data-theme="dark"] .pull-404-number{color:#d6f66c;background:radial-gradient(circle,#254732 0%,#1f3725 55%,transparent 56%);border-color:#496349}
html[data-theme="dark"] .pull-theme-toggle{color:#e1ede4;border-color:#7b927e}
html[data-theme="dark"] #pull-cookie-dialog a,html[data-theme="dark"] #pull-cookie-banner a{color:#d6f66c}
html[data-theme="dark"] .pull-cookie-actions button{color:#e3efdf;border-color:#93a987;background:#183b2b}
html[data-theme="dark"] .pull-cookie-actions :is([data-cookie-accept],[data-cookie-reject]){background:#d6f66c;color:#17321e;border-color:#d6f66c}
html[data-theme="dark"] .pull-media-blocked button{background:#1b3325;color:#e4efdf;border-color:#9bb495}
html[data-theme="dark"] .pull-dashboard-logo{color:#fff}
html[data-theme="dark"] .sentiment-stack .positive,html[data-theme="dark"] .sentiment-legend .positive{background:#82b570}
html[data-theme="dark"] .sentiment-stack .neutral,html[data-theme="dark"] .sentiment-legend .neutral{background:#aabbb0}
html[data-theme="dark"] .sentiment-stack .negative,html[data-theme="dark"] .sentiment-legend .negative{background:#d78b75}
html[data-theme="dark"] .sentiment-stack .mixed,html[data-theme="dark"] .sentiment-legend .mixed{background:#d3b663}
html[data-theme="dark"] .obs-month-track i,html[data-theme="dark"] .digital-bar-row .fill{background:#88bb75}
html[data-theme="dark"] .digital-bar-row:nth-of-type(2) .fill{background:#b3cda6}
html[data-theme="dark"] .digital-bar-row:nth-of-type(3) .fill{background:#d5b776}
html[data-theme="dark"] .digital-bar-row:nth-of-type(4) .fill{background:#8ebfc9}
html[data-theme="dark"] :focus-visible{outline-color:#caa8ff}
'''
(root/'site-dark.css').write_text('/* Generated by scripts/build-dark-theme.py. */\n'+compiled)
print('Dark stylesheet:',len(compiled),'characters')

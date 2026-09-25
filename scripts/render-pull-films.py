"""Render original, silent sculptural motion studies. No third-party footage.

Requires numpy, Pillow and ffmpeg. The deterministic meshes and lighting make
the films reproducible; each page gets a distinct composition and poster.
"""
from pathlib import Path
import math, subprocess
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'films'
OUT.mkdir(parents=True, exist_ok=True)
W,H,FPS,SECONDS = 1280,720,24,8
u = np.linspace(0,2*np.pi,193)
v = np.linspace(0,2*np.pi,65)
U,V = np.meshgrid(u,v,indexing='ij')
light = np.array([-.3,-.6,1.]); light /= np.linalg.norm(light)
yy,xx = np.mgrid[0:H,0:W]
shade = 14+17*np.exp(-((xx-W*.64)**2/(W*.65)**2+(yy-H*.35)**2/(H*.65)**2))
background = np.stack([shade*.96,shade*.98,shade],axis=-1).astype('uint8')

def rotation(ax,ay,az):
    cx,sx,cy,sy,cz,sz=math.cos(ax),math.sin(ax),math.cos(ay),math.sin(ay),math.cos(az),math.sin(az)
    return np.array([[cz,-sz,0],[sz,cz,0],[0,0,1]]) @ np.array([[cy,0,sy],[0,1,0],[-sy,0,cy]]) @ np.array([[1,0,0],[0,cx,-sx],[0,sx,cx]])

def mesh(t,kind,side):
    phase=2*np.pi*t
    if kind=='attraction':
        radius=1.15
        p=np.stack([(radius+.20*np.cos(V))*np.cos(U),(radius+.20*np.cos(V))*np.sin(U),.32*np.sin(V)],axis=-1)
        p=p @ rotation(.20+side*.52,.35*math.sin(phase)+side*.47,side*.3+.12*math.cos(phase)).T
        p[:,:,0]+=side*(.92+.28*math.cos(phase));p[:,:,1]+=side*.09
    elif kind=='alignment':
        # Broad, twisted ribbon formed into a continuous band.
        radius=1.3+.13*np.cos(3*U+phase)
        p=np.stack([(radius+.19*np.cos(V))*np.cos(U),(radius+.19*np.cos(V))*np.sin(U),.38*np.sin(V)+.23*np.sin(2*U+phase)],axis=-1)
        p=p @ rotation(.9+side*.22,side*.4+.15*math.sin(phase),side*.2+.12*math.cos(phase)).T
        p[:,:,0]+=side*.88;p[:,:,1]+=side*.15
    else:
        radius=1.10+.08*np.sin(U*4)
        p=np.stack([(radius+.15*np.cos(V))*np.cos(U),(radius+.15*np.cos(V))*np.sin(U),.45*np.sin(V)],axis=-1)
        p=p @ rotation(side*.65,.55+.25*math.sin(phase),side*.55+.14*math.cos(phase)).T
        p[:,:,0]+=side*(.7+.18*math.cos(phase));p[:,:,1]+=side*.26
    return p

def frame(t,kind):
    im=Image.fromarray(background.copy());draw=ImageDraw.Draw(im)
    faces=[]
    for side in [-1,1]:
        p=mesh(t,kind,side)
        a,b,c,d=p[:-1,:-1],p[1:,:-1],p[1:,1:],p[:-1,1:]
        normal=np.cross(b-a,d-a);normal/=np.maximum(np.linalg.norm(normal,axis=-1,keepdims=True),1e-6)
        lambert=np.abs(normal@light)
        # Neutral ceramic and graphite. Tight highlights describe physical form.
        base=166 if side==-1 else 38
        lum=np.clip(base*(.27+.73*lambert)+68*lambert**24,0,246)
        depth=(a[:,:,2]+b[:,:,2]+c[:,:,2]+d[:,:,2])/4
        points=np.stack([a,b,c,d],axis=2)
        scale=184/(1-points[:,:,:,2]*.08)
        xy=np.stack([W*.56+points[:,:,:,0]*scale,H*.44-points[:,:,:,1]*scale],axis=-1).reshape(-1,4,2)
        for z,poly,color in zip(depth.ravel(),xy.tolist(),lum.astype(int).ravel().tolist()):
            faces.append((z,poly,(color,color,min(255,color+1))))
    for _,poly,color in sorted(faces,key=lambda f:f[0]):draw.polygon([tuple(q) for q in poly],fill=color)
    return im

for kind in ['attraction','alignment','momentum']:
    target=OUT/f'{kind}.mp4'
    proc=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(target)],stdin=subprocess.PIPE)
    for i in range(FPS*SECONDS):
        im=frame(i/(FPS*SECONDS),kind)
        if i==0:im.save(OUT/f'{kind}-poster.webp',quality=88)
        proc.stdin.write(im.tobytes())
    proc.stdin.close()
    if proc.wait():raise RuntimeError('ffmpeg failed')
    print(kind,target.stat().st_size,flush=True)

"""Generate the fictional product PDF from the same JSON as the website."""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
r=json.loads(Path('src/data/gated-resources.json').read_text())[0]
out=Path('public/downloads/tracegate-platform-data-sheet.pdf');out.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(out),pagesize=(612,792));c.setTitle(r['title']);c.setAuthor('Tracegate — fictional portfolio company')
ink=HexColor('#171B20');muted=HexColor('#535B64');signal=HexColor('#F2693A');cloud=HexColor('#F6F7F8');line=HexColor('#DDE1E5')
def text(value,x,y,size=10,color=ink,bold=False):
 c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,value)
def para(value,x,top,width,size=10,color=muted,leading=15):
 p=Paragraph(value,ParagraphStyle('body',fontName='Helvetica',fontSize=size,leading=leading,textColor=color));w,h=p.wrap(width,200);p.drawOn(c,x,top-h);return h
c.setFillColor(cloud);c.rect(0,0,612,792,fill=1,stroke=0)
c.setFillColor(signal)
for x,y in [(44,744),(54,750),(64,744)]:c.rect(x,y,5,15,fill=1,stroke=0)
text('Tracegate',82,747,17,bold=True);text('PLATFORM DATA SHEET / 01',387,749,8,muted)
c.setStrokeColor(line);c.line(44,726,568,726)
text('See the path.',44,676,42,bold=True);text('Stop the breach.',44,630,42,signal,True)
para(r['intro'],44,608,485,11,muted,17)
# A vector route uses the same three relationship concepts as the product preview.
c.setStrokeColor(signal);c.setLineWidth(2);c.line(119,511,493,511)
for x,label,kind in [(44,'Workload','EXPOSURE'),(230,'Identity','ACCESS'),(416,'Resource','CONTEXT')]:
 c.setFillColor(HexColor('#FFFFFF'));c.setStrokeColor(line);c.roundRect(x,482,152,59,5,fill=1,stroke=1)
 text(kind,x+13,525,7,muted);text(label,x+13,499,15,bold=True)
text('A relationship to investigate. A possible path, not proof of a breach.',44,465,9,muted)
for i,item in enumerate(r['capabilities']):
 y=432-i*54;text(f'0{i+1}',44,y,9,signal,True);text(item['title'],72,y,12,bold=True);para(item['copy'],72,y-10,490,9,muted,13)
c.setStrokeColor(line);c.line(44,263,568,263);text('One connected workflow.',44,236,21,bold=True)
for i,item in enumerate(r['workflow']):
 x=44+i*180;text(f'0{i+1} / {item["title"].upper()}',x,204,9,signal,True);para(item['copy'],x,187,158,9,muted,13)
c.setStrokeColor(line);c.line(44,98,568,98);para(r['boundary'],44,83,524,8,muted,11)
text('marketing-demo-topaz.vercel.app',44,30,8,muted);text('FICTIONAL PORTFOLIO PROJECT',421,30,7,muted)
c.showPage();c.save()

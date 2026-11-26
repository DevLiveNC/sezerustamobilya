#!/bin/bash
# Tüm mockup HTML'lerini üretir ve PNG'leri alır. Kullanım: bash hepsini-uret.sh
set -e; cd "$(dirname "$0")"
for f in anasayfa anasayfa390 urun kapi kapi390 teklif e404 wordmark; do python3 $f.py; done
python3 cek.py anasayfa-1440.html 1440 anasayfa-1440.png anasayfa-390.html 390 anasayfa-390.png \
 urun-detay-el-oymasi-1440.html 1440 urun-detay-el-oymasi-1440.png kapi-yapilandirici-1440.html 1440 kapi-yapilandirici-1440.png \
 kapi-yapilandirici-390.html 390 kapi-yapilandirici-390.png teklif-formu-390.html 390 teklif-formu-390.png \
 404-1440.html 1440 404-1440.png wordmark-onerileri.html 1600 wordmark-onerileri.png

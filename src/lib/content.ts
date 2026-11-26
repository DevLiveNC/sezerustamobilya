import { z } from 'zod';
import raw from '../../content/catalog/products.json';
const productSchema = z.object({slug:z.string().min(1),name:z.string().min(1),category:z.literal('el-oymasi'),isSample:z.literal(true)});
export const products = z.array(productSchema).parse(raw);
export const categories = [
 {slug:'el-oymasi', number:'01', title:'El oyması mobilya', short:'El oyması', description:'Ahşaba işlenen detaylar, her biri kendine özgü parçalar.', detail:'Sandıklar, ayna çerçeveleri ve dolaplar. Doğal ahşap üzerine el emeğiyle işlenen, her birinden yalnızca bir adet bulunan parçalar.'},
 {slug:'melamin-kapi', number:'02', title:'Melamin kapı', short:'Melamin kapı', description:'Yaşam alanlarına uygun kapı seçenekleri.', detail:'Melamin kapı seçenekleri için ölçü, adet ve ihtiyaçlarınızı paylaşın. Toptan ve perakende talepleriniz için bizimle görüşün.'},
 {slug:'pvc-kapi', number:'03', title:'PVC kapı', short:'PVC kapı', description:'İhtiyacınıza göre toptan ve perakende.', detail:'PVC kapı seçenekleri için ölçü, adet ve ihtiyaçlarınızı paylaşın. Toptan ve perakende talepleriniz için bizimle görüşün.'},
 {slug:'ozel-uretim', number:'04', title:'Özel üretim', short:'Özel üretim', description:'Aklınızdaki fikir, ölçülerinize göre şekillensin.', detail:'Aklınızdaki işi ve ölçülerinizi bizimle paylaşın; detayları birlikte konuşalım.'}
] as const;
export const whatsapp = 'https://wa.me/905338336481';

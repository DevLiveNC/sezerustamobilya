import type { Metadata } from 'next';
import Header from '@/components/Header'; import Footer from '@/components/Footer'; import './globals.css';
export const metadata:Metadata={title:{default:'Sezer Usta Mobilya | El oyma sanatı, Gazimağusa',template:'%s | Sezer Usta Mobilya'},description:'Gazimağusa Büyük Sanayi’de el oyması mobilya, melamin ve PVC kapı seçenekleri.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body><a className="skip" href="#main">İçeriğe geç</a><Header/><main id="main">{children}</main><Footer/></body></html>}

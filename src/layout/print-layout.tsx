import { I } from '@/data/interface';

export default function PrintLayout({ children }: Readonly<I.Child>) {
  return (
    <div id="print" className="print relative">
      <div className="page">
        <div className="sub-page relative text-black">{children}</div>
      </div>
    </div>
  );
}

import { I } from '@/shared/interface';

export default function PrintLayout({ children }: Readonly<I.IChild>) {
  return (
    <div id="print" className="print relative">
      <div className="page">
        <div className="sub-page relative text-black">{children}</div>
      </div>
    </div>
  );
}

import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  // 解構賦值(Destructing Assignment)
  // 參數名稱會自動對應方法 fetchCardData() 回傳的物件們
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();
  // 以下寫法也可以，但會呼叫 fetchCardData() 四次，效率低
  // const totalPaidInvoices = (await fetchCardData()).totalPaidInvoices;
  // const totalPendingInvoices = (await fetchCardData()).totalPendingInvoices;
  // const numberOfInvoices = (await fetchCardData()).numberOfInvoices;
  // const numberOfCustomers = (await fetchCardData()).numberOfCustomers;
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}

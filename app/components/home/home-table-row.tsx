export default function HomeTableRow({
  month,
  total,
  sold,
  returned,
  clients,
}: {
  month: string;
  total: number;
  sold: number;
  returned: number;
  clients: number;
}) {
  const formattedTotal = total.toLocaleString();
  const formattedSold = sold.toLocaleString();
  const formattedReturned = returned.toLocaleString();
  const formattedClients = clients.toLocaleString();

  return (
    <tr>
      <td className="px-4 py-2 text-center">{formattedClients}</td>
      <td className="px-4 py-2 text-center">{formattedReturned}</td>
      <td className="px-4 py-2 text-center">{formattedSold}</td>
      <td className="px-4 py-2 text-center">{formattedTotal} ج.م</td>
      <td className="px-4 py-2 text-center">{month}</td>
    </tr>
  );
}

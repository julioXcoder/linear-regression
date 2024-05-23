import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const houses = [
  { id: 1, size: 1500, price: 300000 },
  { id: 2, size: 1600, price: 320000 },
  { id: 3, size: 1700, price: 340000 },
  { id: 4, size: 1800, price: 360000 },
  { id: 5, size: 1900, price: 380000 },
  { id: 6, size: 2000, price: 400000 },
  { id: 7, size: 2100, price: 420000 },
  { id: 8, size: 2200, price: 440000 },
  { id: 9, size: 2300, price: 460000 },
  { id: 10, size: 2400, price: 480000 },
  { id: 11, size: 2500, price: 500000 },
  { id: 12, size: 2600, price: 520000 },
  { id: 13, size: 2700, price: 540000 },
  { id: 14, size: 2800, price: 560000 },
  { id: 15, size: 2900, price: 580000 },
  { id: 16, size: 3000, price: 600000 },
];

export function HousePriceTable() {
  return (
    <Table>
      <TableCaption>A list of houses with their sizes and prices.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[100px]">ID</TableHead> */}
          <TableHead>Size</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {houses.map((house) => (
          <TableRow key={house.id}>
            {/* <TableCell className="font-medium">{house.id}</TableCell> */}
            <TableCell>{house.size}</TableCell>
            <TableCell>{house.price} Tsh</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

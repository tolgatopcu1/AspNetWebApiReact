import { TableCell, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/hooks";

export default function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;
    return (
        <>
        <TableRow>
            <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
            <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
        </TableRow>
         <TableRow>
            <TableCell align="right" colSpan={5}>Vergi (%20)</TableCell>
            <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
        </TableRow>
            <TableRow>
            <TableCell align="right" colSpan={5}>Toplam</TableCell>
            <TableCell align="right">{currencyTRY.format(total)}</TableCell>
        </TableRow>
  </>
    );
}
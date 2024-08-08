import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "store/CartSlice";
import { useState } from "react";
interface CartDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  products: CartItem[] | undefined;
}

const Cart: React.FC<CartDialogProps> = ({ open, setOpen, products }) => {
  const [qty, setQty] = useState<number>(1);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      classes={{ paper: "relative z-10 bg-white" }}
    >
      <div className="flex flex-col h-full">
        <DialogTitle className="flex justify-between items-center text-lg font-medium text-gray-900">
          Shopping cart
          <IconButton onClick={() => setOpen(false)} color="inherit">
            <CloseIcon aria-hidden="true" className="h-6 w-6" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-0">
          <div className="overflow-y-auto h-96">
            <ul role="list" className="divide-y divide-gray-200">
              {products?.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.name}
                      src={product.imageSrc[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{product.name}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color[0]}
                    </p>
                    <div className="flex items-end justify-between text-sm mt-auto">
                      <div className="flex items-center justify-between gap-5">
                        <button
                          className={`w-9 h-9 rounded-md bg-black text-white "}`}
                          onClick={() => setQty(qty - 1)}
                          disabled={qty === 1}
                        >
                          -
                        </button>
                        <p className="text-gray-500">Qty {qty}</p>
                        <button
                          className={`w-9 h-9 rounded-md bg-black text-white "}`}
                          onClick={() => setQty(qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <Button
                        color="primary"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions className="p-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.16
            </p>
            <Button
              variant="contained"
              color="primary"
              className="mt-6 w-full"
              href="#"
            >
              Checkout
            </Button>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Button
                  color="primary"
                  onClick={() => setOpen(false)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </p>
            </div>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default Cart;

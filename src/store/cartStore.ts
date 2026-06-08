import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  discount: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => boolean;
  getTotal: () => number;
  getItemCount: () => number;
}

const COUPONS: Record<string, number> = {
  ROSSY10: 10,
  LUXURY20: 20,
  WELCOME15: 15,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      discount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: null, discount: 0 }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      applyCoupon: (code) => {
        const discount = COUPONS[code.toUpperCase()];
        if (discount) {
          set({ coupon: code, discount });
          return true;
        }
        return false;
      },

      getTotal: () => {
        const { items, discount } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return subtotal * (1 - discount / 100);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: "rossy-cart" }
  )
);

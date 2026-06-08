import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => ({ items: [...state.items, item] }));
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      toggleItem: (item) => {
        const { isWishlisted, addItem, removeItem } = get();
        if (isWishlisted(item.id)) {
          removeItem(item.id);
        } else {
          addItem(item);
        }
      },

      isWishlisted: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    { name: "rossy-wishlist" }
  )
);

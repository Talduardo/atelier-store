'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Cart, CartItem } from '@/types/cart'
import {
  CART_STORAGE_KEY,
  FREE_SHIPPING_THRESHOLD,
  DEFAULT_SHIPPING_COST,
  MAX_CART_QUANTITY,
} from '@/lib/constants'

const EMPTY_CART: Cart = {
  items: [],
  subtotal: 0,
  total: 0,
  shipping_cost: 0,
  discount: 0,
  coupon_code: null,
}

function calcCart(items: CartItem[], discount = 0, couponCode: string | null = null): Cart {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : items.length > 0 ? DEFAULT_SHIPPING_COST : 0
  const total = subtotal + shipping - discount

  return { items, subtotal, total, shipping_cost: shipping, discount, coupon_code: couponCode }
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(EMPTY_CART)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Cart
        setCart(calcCart(parsed.items, parsed.discount, parsed.coupon_code))
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart, mounted])

  // ─── Add item ───────────────────────────────────────────────────────────────
  const addItem = useCallback((item: Omit<CartItem, 'id'> & { id?: string }) => {
    setCart((prev) => {
      const exists = prev.items.find((i) => i.product_id === item.product_id)
      let updatedItems: CartItem[]

      if (exists) {
        updatedItems = prev.items.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: Math.min(i.quantity + (item.quantity ?? 1), MAX_CART_QUANTITY) }
            : i,
        )
      } else {
        updatedItems = [
          ...prev.items,
          {
            ...item,
            id: item.id ?? crypto.randomUUID(),
            quantity: item.quantity ?? 1,
          },
        ]
      }

      return calcCart(updatedItems, prev.discount, prev.coupon_code)
    })
  }, [])

  // ─── Remove item ────────────────────────────────────────────────────────────
  const removeItem = useCallback((productId: string) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter((i) => i.product_id !== productId)
      return calcCart(updatedItems, prev.discount, prev.coupon_code)
    })
  }, [])

  // ─── Update quantity ─────────────────────────────────────────────────────────
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setCart((prev) => {
      const updatedItems = prev.items.map((i) =>
        i.product_id === productId
          ? { ...i, quantity: Math.min(quantity, MAX_CART_QUANTITY) }
          : i,
      )
      return calcCart(updatedItems, prev.discount, prev.coupon_code)
    })
  }, [removeItem])

  // ─── Apply coupon ────────────────────────────────────────────────────────────
  const applyCoupon = useCallback((code: string, discountAmount: number) => {
    setCart((prev) => calcCart(prev.items, discountAmount, code))
  }, [])

  // ─── Clear cart ──────────────────────────────────────────────────────────────
  const clearCart = useCallback(() => {
    setCart(EMPTY_CART)
  }, [])

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0)
  const hasItem = (productId: string) => cart.items.some((i) => i.product_id === productId)
  const getItem = (productId: string) => cart.items.find((i) => i.product_id === productId)
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal)

  return {
    cart,
    mounted,
    itemCount,
    hasItem,
    getItem,
    freeShippingRemaining,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    clearCart,
  }
}

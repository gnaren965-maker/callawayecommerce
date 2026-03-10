### Place the order-Stock order 
**Seed:** `tests/seed.spec.ts`
**File:** `tests/US/us-place-stock order.spec.ts`


**Steps:**
  1. Log in and navigate to the homepage
    - expect: User is logged in
  2. Click on 'Place Order' in the main navigation
    - expect: Place Order submenu expands displaying product categories: Clubs, Balls, Gear, OGIO GEAR
  3. Hover over or click 'Clubs' category
    - expect: Clubs subcategory menu expands showing: Drivers, Fairway Woods, Hybrids, Irons, Combo Sets, Complete Sets, Wedges, Odyssey Putters, Shafts

  1. NowHover over or Click on "Drivers"
    - expect: Drivers product listing page is displayed
    - expect: Page title shows 'DRIVERS'
    - expect: Multiple driver products are listed
2. Click on 'Stock Order' button for a specific product (e.g., ELYTE NIGHT EDITION DRIVER)
    - expect: Bulk order page is displayed for the selected product
    - expect: Page title matches the product name
    - expect: Product image and name are displayed
    - expect: 'Order Custom' link is available for custom orders
    - expect: A table is displayed with pre-configured product specifications
  2. Enter quantity (e.g., 5) in the Quantity field for the first row and wait until that product is added "order summary" section
    - expect: Quantity value is entered in the field
  3. Enter quantity for additional rows as needed
 wait until that product is added "order summary" section    - expect: Multiple quantities are entered for different configurations
  4. Review the Order Summary section at the bottom
    - expect: Order Summary shows selected products and quantities
    - expect: Add To Cart button is visible
    - expect: Button state changes based on whether products are selected
  5. Click the 'Add To Cart' button
    - expect: Items are added to the shopping cart
    - expect: Confirmation message may be displayed
    - expect: Cart count in the header updates to reflect new items if visible
6. Click the “Proceed to Checkout” button
  -expect:Order summary information is displayed
7. Again Click on “Proceed to checkout” button
-expect: Secure Checkout page is displayed.
8. Now enter “P.O. Number” filed value as “57643” and Enter the “Name” as “TesterOne”
-expect: “Place Order” button displayed in enable mode.
9. Now Click on “Place Order” button.
-Expect: the order confirmation page is displayed.



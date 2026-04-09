import { type Item } from "../types"; 

const ItemCard = ({title, price, date, img, role, category}: Item) => {

	return (
    <> 
      
      <h1>{title}{price}{date.day}{img}{role}{category}</h1> // you can delete this, I just put it here so it would stop giving error
      {
      
      /*
        COMPONENT GOAL:
        This component represents each item card when previewing items in, for example,
        the client or vendor profile. It should show the item price, picture of item,
        item title, the date the item was put on sale, a category, and a button for 
        either "View Product Details" or "Edit Item Details" (more on this later)

        Based on the design, this component should include:
        1. Title of item
          - title is type string

        2. Price of item
          - price is type number

        3. Date that the item was put on sale
          - date is an interface that has the following components
            - day of type number
            - month of type string
            - year of type number
        
        4. Image of the item
          - img is type string that represents the image path to the image
          - I added a sample item image in the images folder so you can test it
        
        5. Category of item
          - category is type string that represents the category of item (e.g. desk, bed, closet)
          - note that on the Figma, it shows multiple categories for each item
            we will for now just focus on ONE category. So no need to focus on having multiple

        6. a delete button

        7. a button to view or edit details
          - role is type UserRole. Use this to determine whether this ItemCard is being viewed
            on the client side or vendor side. If it is being viewed on the client side, then the 
            message should be "View Product Details". If viewed on vendor side, then "Edit Item Details"
        
        TODO:
        - implement all the parts of this component, following the Figma design and color style
        - everything can be static for now
          - nothing needs to happen when trying to click on the item (for now...)
          - nothing needs to happen when trying to click on the edit icon (for now...)

        NOTES:
        - Focus on frontend and the UI only!
        - Do not implement full edit/delete functionality yet
        - Buttons can be static for now
        - you can assume all the data given is in the correct format
        - you can find the types for everything in types.ts
        - we are using Tailwind CSS

        LATER:
        - users should be able to click on the edit/view buttons, redirecting them to the item page
        - multiple tags/categories if we have time
      */
      
      }

  	</>

  );
};

export default ItemCard;
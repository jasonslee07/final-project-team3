import { type Item } from "../types"; 

const ItemCard = ({title, price, date, img}: Item) => {

	return (
    <> 
      
      <h1>{title}{price}{date.day}{img}</h1> // you can delete this, I just put it here so it would stop giving error
      {
      
      /*
        COMPONENT GOAL:
        This component represents each item card when previewing items in, for example,
        the client or vendor profile. It should show the item price, picture of item,
        item title, the date the item was put on sale, and an edit button (only for vendor side!)

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
        
        5. Whether this component is shown in vendor profile
          - vendor is type boolean which represents if this component is being used in the 
            vendor profile or not
          - if true, the edit icon should show, since vendors can edit the items they are selling
          - vice versa, if false, the edit icon should not show

        
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
        - users should be able to click on the items, redirecting them to the item page
        - vendors should be able to click on the edit icon
      */
      
      }

  	</>

  );
};

export default ItemCard;
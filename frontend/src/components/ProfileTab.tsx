import { type Tabs } from "../types"

const ProfileTab = ({tab1, tab2, tab3}: Tabs) => {

  return (
		<>
			<h1>{tab1}{tab2}{tab3}</h1> // you can delete this, I just put it here so it would stop giving error

			{
			
			/*
        COMPONENT GOAL:
        This component represents the tabs on the client and vendor profile
				E.g. for the client profile, the tabs are Cart, Ordered, and Past
				E.g. for the vendor profile, the tabs are Items, Drafts, and Sold

        Based on the design, this component should include:
        1. Three tabs
          - The three tabs are represented as type Tab
					- type Tab is three tabs, each of type string
					- you can find these types in types.ts

        TODO:
        - implement the tab component, following the Figma design and color style
        - everything can be static for now
          - nothing needs to happen when trying to click on the different tabs (for now...)

        NOTES:
        - Focus on frontend and the UI only!
        - Do not implement full edit/delete functionality yet
        - Buttons can be static for now
        - you can assume all the data given is in the correct format
				- you can find the types for everything in types.ts
				- we are using Tailwind CSS

        LATER:
        - users should be able to click on the tabs, redirecting them to the appropriate page
      */
			}
		</>
  );
};

export default ProfileTab;
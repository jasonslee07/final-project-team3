import { type ProfileInfo } from "../types"

const ProfileHeader = ({name, role, desc, img}: ProfileInfo) => {

	return (
  	<> 
      
      <h1>{name}{role}{desc}{img}</h1> // you can delete this, I just put it here so it would stop giving me error
      {
      
      /*
        COMPONENT GOAL:
        This component represents the profile header for vendor and client
				This includes a picture, name, role, and description of that person

        Based on the design, this component should include:
        1. Name of person
          - name is type string

        2. Role of person
          - role is type UserRole which is a variant defined as "Client" or "Vendor"

        3. Description of person
          - desc is type string

        4. Profile picture of person
          - img is type string that represents the image path to the profile picture
          - I added a sample profile picture in the images folder so you can test it
        
        TODO:
        - implement all the parts of this component, following the Figma design and color style
        - everything can be static for now (I think this component will be static overall actually...)

        NOTES:
        - Focus on frontend and the UI only!
        - you can assume all the data given is in the correct format
				- you can find the types for everything in types.ts
				- we are using Tailwind CSS
      */
			}

  	</>

  );
};

export default ProfileHeader;
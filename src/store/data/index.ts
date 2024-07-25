export interface Entity {
    name: string;
    initialData: Record<string, any>;
  }
  
export const entities: Entity[] = [
    {
      name: 'user',
      initialData: {
        name: 'joe',
        email: 'joe@yopmail.com',
        // Other properties
      }
    },
    {
      name: 'posts',
      initialData: {
        title: 'Lorem Ipsum',
        body: 'Lorem ipsum dolor ...',
        // Other properties
      }
    },
    {
      name: 'categories',
      initialData: {
        title: 'Option One',
        // Other properties
      }
    }
  ];
  
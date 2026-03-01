export default defineEventHandler(async () => {
  return {
    status: 'success',
    data: [
      {
        _id: 'cat-1',
        name: 'Electronics',
        alias: 'electronics',
        path: 'electronics',
        description: 'Electronic devices and gadgets',
        active: true,
        children: [
          {
            _id: 'cat-1-1',
            name: 'Smartphones',
            alias: 'smartphones',
            path: 'electronics/smartphones',
            active: true,
          },
          {
            _id: 'cat-1-2',
            name: 'Laptops',
            alias: 'laptops',
            path: 'electronics/laptops',
            active: true,
          },
          {
            _id: 'cat-1-3',
            name: 'Tablets',
            alias: 'tablets',
            path: 'electronics/tablets',
            active: true,
          },
        ],
      },
      {
        _id: 'cat-2',
        name: 'Audio',
        alias: 'audio',
        path: 'audio',
        description: 'Audio equipment and accessories',
        active: true,
        children: [
          {
            _id: 'cat-2-1',
            name: 'Headphones',
            alias: 'headphones',
            path: 'audio/headphones',
            active: true,
          },
          {
            _id: 'cat-2-2',
            name: 'Speakers',
            alias: 'speakers',
            path: 'audio/speakers',
            active: true,
          },
        ],
      },
      {
        _id: 'cat-3',
        name: 'Components',
        alias: 'components',
        path: 'components',
        description: 'Computer components and peripherals',
        active: true,
        children: [
          {
            _id: 'cat-3-1',
            name: 'Keyboards',
            alias: 'keyboards',
            path: 'components/keyboards',
            active: true,
          },
          {
            _id: 'cat-3-2',
            name: 'Mice',
            alias: 'mice',
            path: 'components/mice',
            active: true,
          },
        ],
      },
    ],
  };
});

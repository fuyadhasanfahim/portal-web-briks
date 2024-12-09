import OrderList from './OrderList';

const orders = [
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
    {
        id: 1,
        title: 'Digital marketing',
        image: '/images/order-list/service.png',
        price: '120',
    },
];

export default function OrderLists() {
    return (
        <div className="flex flex-wrap gap-5 items-center justify-between w-full mx-auto">
            {orders.map((order, index) => {
                const { image, title, price } = order;

                return (
                    <OrderList
                        key={index}
                        title={title}
                        image={image}
                        price={price}
                    />
                );
            })}
        </div>
    );
}

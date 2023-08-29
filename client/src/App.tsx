import { Badge, Button, Rating } from '@material-tailwind/react';
const App = () => {
  return (
    <>
      <Badge content="5">
        <Button className="bg-red-100">Notifications</Button>
      </Badge>
      <Rating />;<h1 className="mt-10 text-3xl font-bold underline bg-red-100">Hello world!dasd</h1>
    </>
  );
};

export default App;

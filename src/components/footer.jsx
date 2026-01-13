import Card from "react-bootstrap/Card";

function BgColorExample() {
  return (
    <>
      {["beige"].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === "light" ? "dark" : "black"}
          style={{ width: "100%", marginTop: "20px" }}
          className="mb-2"
        >
          <Card.Header>About us</Card.Header>
          <Card.Body>
            <Card.Title>About us </Card.Title>
            <Card.Text>
              YOU GOOD is your go-to platform for booking salon appointments
              with ease. Whether you're looking for a trendy haircut, a relaxing
              spa treatment, or a stylish makeover, YOU GOOD connects you with
              top-rated salons in your area. Our user-friendly interface allows
            </Card.Text>
            <Card.Text>instagram: @you_good_official</Card.Text>
            <Card.Text>email: yougood@gmail.com</Card.Text>
            <Card.Text>phone: +1 234 567 890</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BgColorExample;

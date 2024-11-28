export class User {
  name: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
  address: string;
  image: string;


  constructor(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string,
    address: string,
    image: string,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.address = address;
    this.image = image;
  }
}

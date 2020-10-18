import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, 'auth');
    router.push('/login');
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Link href='/'>
        <Navbar.Brand href='/'>作業管理ページ</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Link href='/' passHref>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link href='/input' passHref>
            <Nav.Link>時間登録</Nav.Link>
          </Link>
          <NavDropdown title='ランニング' id='nav-dropdown-running'>
            <Link href='/running' passHref>
              <NavDropdown.Item eventKey='1.1'>グラフ</NavDropdown.Item>
            </Link>
          </NavDropdown>
          <NavDropdown title='学習' id='nav-dropdown-running'>
            <Link href='/learning' passHref>
              <NavDropdown.Item eventKey='2.1'>グラフ</NavDropdown.Item>
            </Link>
            <Link href='/learning/content/list' passHref>
              <NavDropdown.Item eventKey='2.2'>学習内容一覧</NavDropdown.Item>
            </Link>
          </NavDropdown>
          <NavDropdown title='読書' id='nav-dropdown-running'>
            <Link href='/reading' passHref>
              <NavDropdown.Item eventKey='3.1'>グラフ</NavDropdown.Item>
            </Link>
            <Link href='/reading/content/list' passHref>
              <NavDropdown.Item eventKey='3.2'>登録</NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
        <Form inline>
          <Button variant='light' onClick={handleLogout}>
            ログアウト
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

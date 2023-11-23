import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Layout, List, Menu, MenuProps, Row, Select, Typography} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const {Header, Content, Footer} = Layout;

const items1: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a href="/" rel="noopener noreferrer">
        Home
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/products" rel="noopener noreferrer">
        Productos
      </a>
    ),
  }];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('vtex');
  const [products, setProducts] = useState([]); // Aquí guardas los productos que obtienes de la petición

  const handleChange = (value: string) => {
    setSelectedState(value);
  }

  // Crea un efecto para manejar los cambios en selectedState
  useEffect(() => {
    if (selectedState) {
      // Realiza la petición a tu servicio local cuando selectedState cambia
      axios.get(`${process.env.REACT_APP_API_URL}/product/search/${selectedState}`)
        .then(response => {
          // Maneja la respuesta aquí
          setProducts(response?.data?.result?.items || [])
          console.log(response.data);
        })
        .catch(error => {
          // Maneja el error aquí
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [selectedState]);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{display: 'flex', alignItems: 'center'}}>
        <div className="demo-logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} onClick={(e) => {
          console.log(e);
        }}/>
      </Header>
      <Layout>
        <Content style={{padding: 36, textAlign: 'center', maxWidth: 1320, alignSelf: 'center'}}>
          <Typography>
            Seleccione la plataforma de la que desea buscar sus productos
          </Typography>
          <Row style={{ placeContent: 'center'}}>
            <div>
              <Select
                defaultValue={selectedState}
                style={{ width: '100%', borderRadius: 30, maxWidth: 350, margin: 10, }}
                onChange={handleChange}
                options={[
                  { value: 'vtex', label: 'VTEX' },
                  { value: 'shopify', label: 'SHOPIFY' },
                ]}
              />
              <Button
                icon={<SearchOutlined/>}
                onClick={() => navigate('/products')}
                type="link" style={{ borderRadius: 30, maxWidth: 350, margin: 10, }}>Busqueda avanzada</Button>
            </div>
            <Col span={24}>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={products}
                renderItem={(item: any) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={item.image} height={250}/>}
                      actions={[
                        <Button type="primary">
                          Seleccionar
                        </Button>
                      ]}
                      bodyStyle={{
                        padding: 0,
                        margin: '5px 10px'
                      }}
                    >
                      <Typography.Paragraph ellipsis={true}  style={{ textAlign: 'start', fontSize: 14, opacity: 0.5  }}>{item.name || 'Pantalones'}</Typography.Paragraph>
                      <Typography.Paragraph ellipsis={true}  style={{ textAlign: 'start', fontSize: 14, fontWeight: 'bold' }}>${item?.price}</Typography.Paragraph>
                    </Card>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Prueba ©2023 Created </Footer>
    </Layout>
  );
};

export default LandingPage;


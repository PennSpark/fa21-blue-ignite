import React from "react";
import { Button, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Minecart,
  MinecartLoaded,
  ArrowRight,
  Eraser,
} from "react-bootstrap-icons";

export default class Cart extends React.Component {
  render() {
    return (
      <div className="items">
        {this.props.items.length > 0 ? (
          <NavDropdown
            id="cart-dropdown"
            title={<MinecartLoaded />}
            autoClose="outside"
            align={{ lg: "end" }}
          >
            <NavDropdown.ItemText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outline-danger"
                  className="shadow-none"
                  size="sm"
                  onClick={this.props.onClearItems}
                >
                  Clear{/*Cart*/}
                </Button>
                <Button
                  variant="outline-primary"
                  className="shadow-none"
                  size="sm"
                >
                  <ArrowRight /> {/*Checkout <ArrowRight />*/}
                </Button>
              </div>
            </NavDropdown.ItemText>
            <NavDropdown.Divider />
            {this.props.items.map((item, index) => (
              <div>
                <NavDropdown.Item className="item">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.i}</span>
                    <Eraser
                      color="red"
                      fontSize="0.9em"
                      onClick={this.props.onTakeItem.bind(undefined, item)}
                    />
                  </div>
                </NavDropdown.Item>
                {index < this.props.items.length - 1 ? (
                  <NavDropdown.Divider />
                ) : null}
              </div>
            ))}
          </NavDropdown>
        ) : (
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip>
                Cart is empty. Go add some items to <strong>spark</strong> your
                next big idea! 💡
              </Tooltip>
            }
          >
            <NavDropdown
              id="cart-dropdown-disabled"
              title={<Minecart />}
              autoClose={true}
              align={{ lg: "end" }}
              disabled={true}
            >
              <div style={{ paddingLeft: "3%" }}>Go add some items!</div>
            </NavDropdown>
          </OverlayTrigger>
        )}
      </div>
    );
  }
}

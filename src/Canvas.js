import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
//import { MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import "./css/react-grid-layout-style.css";
import "./css/react-resizable-style.css";
import { PlusCircle } from "react-bootstrap-icons";
import NavBar from "./Components/NavBar";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function generateLayout() {
  return _.map(_.range(0, 41), function (item, i) {
    const width = 12; // width of entire canvas (should ideally be multiple of 4 and 3)
    const y = 4;
    const w = 3;
    var h = Math.ceil(Math.random() * 6) + 1; // variability in height
    var x = (_.random(0, y - 1) * w) % width;
    return {
      x: x,
      y: Math.floor(i / y) * h,
      w: w,
      h: h,
      i: i.toString(),
    };
  });
}

export default class Canvas extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout(),
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout },
    block: { lg: [] },
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts[this.state.currentBreakpoint], (l) => {
      return (
        <div key={l.i}>
          <PlusCircle
            className="hide-button"
            onClick={this.onPutItem.bind(this, l)}
          />
          <img
            src={`https://picsum.photos/${l.w * 230}/${l.h * 100}`}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          ></img>
          {/*<span className="text">{l.i}</span>  //commented out for demo purposes:) */}
        </div>
      );
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState((prevState) => ({
      currentBreakpoint: breakpoint,
      block: {
        ...prevState.block,
        [breakpoint]:
          prevState.block[breakpoint] ||
          prevState.block[prevState.currentBreakpoint] ||
          [],
      },
    }));
  };

  onClearItems = () => {
    (this.state.block[this.state.currentBreakpoint] || []).forEach((item) => {
      this.onTakeItem(item);
    });
    console.log("clear");
  };

  onTakeItem = (item) => {
    this.setState((prevState) => ({
      block: {
        ...prevState.block,
        [prevState.currentBreakpoint]: prevState.block[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i),
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item,
        ],
      },
    }));
  };

  onPutItem = (item) => {
    this.setState((prevState) => {
      return {
        block: {
          ...prevState.block,
          [prevState.currentBreakpoint]: [
            ...(prevState.block[prevState.currentBreakpoint] || []),
            item,
          ],
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i),
        },
      };
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };

  onNewLayout = () => {
    this.setState({
      layouts: {
        lg: generateLayout(),
        md: generateLayout(),
        sm: generateLayout(),
        xs: generateLayout(),
        xxs: generateLayout(),
      },
    });
  };

  render() {
    return (
      <div>
        <NavBar
          onNewLayout={this.onNewLayout}
          onTakeItem={this.onTakeItem}
          onClearItems={this.onClearItems}
          items={this.state.block[this.state.currentBreakpoint] || []}
        />

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

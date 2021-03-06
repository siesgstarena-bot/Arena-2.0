import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {
  DrawerContent, DrawerHeader, DrawerTitle, DrawerSubtitle,
} from '@material/react-drawer';
import List, {
  ListItem, ListItemGraphic, ListItemText,
} from '@material/react-list';
import drawerItems from './drawerItems';
import './AppBar.scss';
import 'tachyons';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedIndex: 0,
    };
  }
  // selectedIndex is the state variable which decides which option is selected

  componentDidMount() {
    // The following conditional statements are used to
    // check that on which route our page was refreshed
    // and thereby updating the value of selectedIndex respectively.
    // This was needed to be done because when the page is refreshed
    // all the states are reset and hence the selectedIndex always was initialized
    // with 0 but the active link was the same as the previous one.
    const { location } = this.props;
    const { pathname: currentPathname } = location;
    if (currentPathname === '/') {
      this.setState({
        selectedIndex: 0,
      });
    } else if (currentPathname === '/contests') {
      this.setState({
        selectedIndex: 1,
      });
    } else if (currentPathname === '/ratings') {
      this.setState({
        selectedIndex: 2,
      });
    } else if (currentPathname === '/blog') {
      this.setState({
        selectedIndex: 3,
      });
    } else if (currentPathname === '/problem-set') {
      this.setState({
        selectedIndex: 4,
      });
    } else if (currentPathname === '/playlists') {
      this.setState({
        selectedIndex: 5,
      });
    } else if (currentPathname === '/goodies') {
      this.setState({
        selectedIndex: 6,
      });
    } else if (currentPathname === '/turing-cup') {
      this.setState({
        selectedIndex: 7,
      });
    } else {
      this.setState({
        // selectedIndex : 100 specifies that no item from the drawer is selected
        // Any random large number can be taken
        selectedIndex: 100,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { pathname: currentPathname } = location;
    const { location: oldLocation } = prevProps;
    const { pathname: oldPathname } = oldLocation;
    // Here we update the states when the URL is changed
    // And according to value of the URL(currentPathname) we assign the value of selectedIndex
    // And we also make sure that when the URL is changed we close the drawer

    if (oldPathname !== currentPathname) {
      if (currentPathname === '/') {
        this.setState({
          selectedIndex: 0,
          open: false,
        });
      } else if (currentPathname === '/contests') {
        this.setState({
          selectedIndex: 1,
          open: false,
        });
      } else if (currentPathname === '/ratings') {
        this.setState({
          selectedIndex: 2,
          open: false,
        });
      } else if (currentPathname === '/blog') {
        this.setState({
          selectedIndex: 3,
          open: false,
        });
      } else if (currentPathname === '/problem-set') {
        this.setState({
          selectedIndex: 4,
          open: false,
        });
      } else if (currentPathname === '/playlists') {
        this.setState({
          selectedIndex: 5,
          open: false,
        });
      } else if (currentPathname === '/goodies') {
        this.setState({
          selectedIndex: 6,
          open: false,
        });
      } else if (currentPathname === '/turing-cup') {
        this.setState({
          selectedIndex: 7,
          open: false,
        });
      } else {
        this.setState({
        // selectedIndex : 100 specifies that no item from the drawer is selected
        // Any random large number can be taken
          selectedIndex: 100,
          open: false,
        });
      }
    }
  }

  // The following function closes the drawer (by making open=false)
  // and updates selectedIndex depending upon which item is clicked
  onItemClick = (index) => {
    const { open } = this.state;
    this.setState({
      open: !open,
      selectedIndex: index,
    });
  }

  render() {
    const { open, selectedIndex } = this.state;
    return (
      <div>
        { open
          ? (
            <Drawer
              className="react-drawer-alternate"
              modal
              open={open}
              onClose={() => this.setState({ open: false })}
            >

              <DrawerHeader>
                {/* defaults to div */}
                <DrawerTitle tag="h2">
                  {/* defaults to h3 */}
                  Explore Arena
                </DrawerTitle>
                <DrawerSubtitle>
                  {/* defaults to h6 */}
                  matt@email.com
                </DrawerSubtitle>
              </DrawerHeader>

              <DrawerContent>
                <List singleSelection selectedIndex={selectedIndex}>
                  { drawerItems.map((item, index) => (
                    <ListItem key={item.id} className="pointer" style={{ padding: '0' }} onClick={() => this.onItemClick(index)}>
                      <NavLink to={{ pathname: item.path }} exact className="no-underline db pa3 black" activeStyle={{ color: '#6200EE' }} style={{ width: '100%' }}>
                        <ListItemGraphic className="v-mid" graphic={<MaterialIcon icon={item.icon} />} />
                        <ListItemText className="v-mid" primaryText={item.name} />
                      </NavLink>
                    </ListItem>
                  ))
                  }
                </List>
              </DrawerContent>
            </Drawer>
          )
          : <div />
        }

        <TopAppBar
          fixed
          className="react-top-app-bar-alternate"
          title="SIESGSTarena"
          navigationIcon={(
            <MaterialIcon
              icon="menu"
              onClick={() => this.setState({ open: !open })}
            />
          )}
          actionItems={[
            <MaterialIcon key="item" icon="search" />,
            <MaterialIcon key="item" icon="account_circle" />,
          ]}
        />
        <TopAppBarFixedAdjust />
      </div>
    );
  }
}

AppBar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default AppBar;

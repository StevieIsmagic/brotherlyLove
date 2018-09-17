import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserLegend = () => (
  <View>
    <TouchableOpacity>
      <View style={styles.drawerItem}>
        <Text>
          Brother Badge Legend:
        
          Think: Existing Positions
          Create Member Badges
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#eee'
  }
})

export default UserLegend;
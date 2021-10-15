import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/navOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const GOOGLE_MAPS_APIKEY = "ENTER_YOUR_GOOGLE_MAPS_API_KEY";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{ uri: "https://links.papareact.com/gzs" }}
          />
          <GooglePlacesAutocomplete
            placeholder="Where From?"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
          <NavOptions />
          <NavFavourites />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

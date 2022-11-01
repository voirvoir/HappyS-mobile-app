//PropTypes check
import PropTypes from "prop-types";
import React from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Colors from "../../../utils/Colors";

const { height, width } = Dimensions.get("window");

export const AuthBody = ({ navigation }) => {
	return (
		<>
			<View style={{ position: "absolute", top: 0, left: 0, width }}>
				<Image
					source={require("../../../assets/Images/auth/frame.png")}
				/>
			</View>
			<View style={{ position: "absolute", top: 60 }}>
				<Image
					style={styles.logo}
					source={require("../../../assets/icon_1.png")}
				/>
			</View>
			<View style={{ position: "absolute", top: 150 }}>
				<Image
					source={require("../../../assets/Images/auth/banner.png")}
					resizeMode="contain"
					resizeMethod="auto"
				/>
			</View>
			<View style={{ position: "absolute", bottom: 80 }}>
				<TouchableOpacity
					onPress={() => navigation.navigate("LoginScreen")}
				>
					<View
						style={[
							styles.signinContainer,
							{
								backgroundColor: Colors.leave_green,
								marginTop: 15,
								borderWidth: 0,
							},
						]}
					>
						<Text style={[styles.text, { color: Colors.white }]}>
							LOGIN
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("SignupScreen")}
				>
					<View style={styles.signupContainer}>
						<Text>
							<Text style={styles.helperText}>
								Already have account?
							</Text>
							<Text style={[styles.text]}> SIGNUP</Text>
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

AuthBody.propTypes = {
	navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	signinContainer: {
		height: 60,
		width: width - 40,
		borderRadius: 30,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: Colors.leave_green,
	},
	signupContainer: {
		height: 40,
		width: width - 40,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.blue,
	},
	logo: {
		resizeMode: "cover",
		width: 30,
		height: 30,
	},
	helperText: {
		color: Colors.helper,
	},
});

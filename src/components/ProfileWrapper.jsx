import { useState } from "react";
import Profile from "./Profile.jsx";

const ipv4Pattern =
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
const ipv6Pattern =
  /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;

const configOptions = ["Ip", "Name", "Port"];
const configSanitizer = {
  ["Ip"]: (ip) => {
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
  },
  ["Name"]: (name) => {
    return !(name.length === 0);
  },
  ["Port"]: (port) => {
    port = Number(port);
    return 0 <= port && port <= 65535;
  },
};

const askProfile = () => {
  try {
    return Object.fromEntries(
      Array.from(configOptions, (config) => {
        const inp = prompt(`Enter ${config} :`);
        if (!configSanitizer[config](inp)) {
          alert(`Invalid input for ${config}`);
          throw new Error("Sanitization error");
        }
        return [config.toLowerCase(), inp];
      }),
    );
  } catch (_) {
    return null;
  }
};

const askAndAddProfile = (setProfiles) => {
  const profile = askProfile();
  if (!profile) return;
  setProfiles((prev) => [...prev, profile]);
};

const askAndRemoveProfile = (selectedProfile, setProfiles) => {
  if (!selectedProfile) {
    alert("select a profile");
    return;
  }
  const index = selectedProfile - 1;
  setProfiles((prev) => {
    return prev.filter((_, ind) => {
      return !(ind === index);
    });
  });
};

const ProfileWrapper = ({ setClicked, profiles = [], setProfiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  return (
    <div className="profiles-contianer flex flex-col gap-10 justify-center items-center">
      <div className="profiles flex gap-10">
        {profiles?.map((profile, index) => (
          <Profile
            setProfiles={setProfiles}
            index={index}
            profile={profile}
            onClick={() => {
              setSelectedProfile((prev) => {
                if (prev === index + 1) return 0;
                return index + 1;
              });
            }}
            key={index}
            selectedProfile={selectedProfile === index + 1}
          />
        ))}
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
        <div className="profile-controls flex gap-10 justify-center items-center">
          <div
            onClick={() => askAndAddProfile(setProfiles)}
            className="add cursor-pointer"
          >
            Add
          </div>
          <div
            onClick={() => {
              askAndRemoveProfile(selectedProfile, setProfiles);
              setSelectedProfile(0);
            }}
            className="remove cursor-pointer"
          >
            Remove
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="flex justify-center items-center px-5 py-2 bg-gray-300 rounded-2xl w-fit cursor-pointer"
            onClick={() => {
              if (selectedProfile === 0) {
                alert("select a profile");
                return;
              }
              setClicked({
                selectedProfile,
                profiles,
              });
            }}
          >
            proceed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;

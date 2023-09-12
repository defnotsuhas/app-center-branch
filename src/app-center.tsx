import { useState } from "react";
import { Action, List, ActionPanel } from "@raycast/api";

interface BranchProps {
  branch: string;
}

function HandleAction(props: BranchProps & { platform: string }) {
  const { branch, platform } = props;
  const encodedBranch = encodeURIComponent(branch);
  const org = "rently";
  const app = platform === "iOS" ? "Renter-Ios" : "Renter-Android";
  const URL = `https://appcenter.ms/orgs/${org}/apps/${app}/build/branches/${encodedBranch}`;

  return (
    <ActionPanel>
      <Action.OpenInBrowser url={URL} title={`Open ${branch} for ${platform}`} />
    </ActionPanel>
  );
}

function HandleCodepushAction(props: { platform: string }) {
  const { platform } = props;
  const org = "rently";
  const app = platform === "iOS" ? "Renter-Ios" : "Renter-Android";
  const URL = `https://appcenter.ms/orgs/${org}/apps/${app}/distribute/code-push/Staging`;

  return (
    <ActionPanel>
      <Action.OpenInBrowser url={URL} title={`Open Codepush for ${platform}`} />
    </ActionPanel>
  );
}

export default function Command() {
  const [searchText, setSearchText] = useState("");

  return (
    <List
      enableFiltering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Choose App"
      searchBarPlaceholder="Android or iOS..."
    >
      <List.Item key="android" title="Android" actions={<HandleAction branch={searchText} platform="Android" />} />
      <List.Item key="ios" title="iOS" actions={<HandleAction branch={searchText} platform="iOS" />} />
      <List.Item
        key="android-codepush"
        title="Android Codepush"
        actions={<HandleCodepushAction platform="Android" />}
      />
      <List.Item key="ios-codepush" title="iOS Codepush" actions={<HandleCodepushAction platform="iOS" />} />
    </List>
  );
}

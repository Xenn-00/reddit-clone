import { authModalState } from "@/atoms/authModalAtoms";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import Communities from "@/components/Navbar/Directory/Communities";
import { auth, firestore } from "@/firebase/clientApp";
import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [communityStateValue, setCommuntyStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in
    // if not  => open auth modal
    if (!user) {
      // open modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getSnippets = async () => {
    setLoading(true);
    try {
      // get user snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommuntyStateValue((prev) => ({
        ...prev,
        Snippets: snippets as Array<CommunitySnippet>,
      }));
      console.log("snippets : ", snippets);
    } catch (error) {
      console.log("getSnippets error", error);
    }
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    // batch write
    try {
      const batch = writeBatch(firestore);
      // creating a new community snippet

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        {
          newSnippet,
        }
      );
      // updating the numberOfMembers +1

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      // update recoil state - communityState.Snippets
      setCommuntyStateValue((prev) => ({
        ...prev,
        Snippets: [...prev.Snippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }

    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);
      // deleting the community snippets from user
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      // Update the numberOfMembers -1
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();

      // update recoil state - communityState.Snippets
      setCommuntyStateValue((prev) => ({
        prev,
        Snippets: prev.Snippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getSnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;

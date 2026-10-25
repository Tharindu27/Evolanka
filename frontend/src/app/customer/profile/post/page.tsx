'use client';

import { useState } from 'react';

import AddPostModal from '@/components/customer/post/add-post-modal';
import EditBioModal from '@/components/customer/post/edit-bio-modal';
import PostCard from '@/components/customer/post/post-card';
import PostPersonalInfo from '@/components/customer/post/post-personal-info';
import PostProfileHeader from '@/components/customer/post/post-profile-header';
import Sidebar from '@/components/customer/common/sidebar';
import { accountProfile, navigationItems, profileDetails } from '@/data/customer-account-data';
import {
  emptyPostDraft,
  postItems,
  postProfile,
  postTabs,
  type PostDraft,
  type PostItem,
  type PostPersonalDetails,
  type PostTab,
} from '@/data/customer-post-data';

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Converts "12 October 2003" to "2003-10-12".
function toIsoDate(text: string) {
  const [day, month, year] = text.split(' ');
  const monthIndex = monthNames.indexOf(month?.toLowerCase());
  if (monthIndex < 0) return '';

  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function buildPersonalDetails(): PostPersonalDetails {
  const detail = (label: string) => profileDetails.find((item) => item.label === label)?.value ?? '';

  return {
    dob: toIsoDate(detail('Date of Birth')),
    email: accountProfile.email,
    contact: detail('Mobile Number'),
    gender: 'Male',
    country: detail('Country / Nationality'),
    nativeLanguage: 'Sinhala',
  };
}

function toDraft(post: PostItem): PostDraft {
  const images = post.gallery?.length ? post.gallery : post.image ? [post.image] : [];

  return {
    caption: post.caption,
    location: post.location,
    tags: post.tags ?? [],
    serviceType: post.service?.type ?? emptyPostDraft.serviceType,
    serviceName: post.service?.name ?? '',
    visibility: post.visibility ?? 'Public',
    media: [
      ...images.map((url, index) => ({ id: `${post.id}-image-${index}`, type: 'image' as const, url, name: `Photo ${index + 1}` })),
      ...(post.video ? [{ id: `${post.id}-video`, type: 'video' as const, url: post.video, name: 'Video' }] : []),
    ],
  };
}

export default function CustomerPostPage() {
  const [activeTab, setActiveTab] = useState<PostTab>('All Posts');
  const [posts, setPosts] = useState<PostItem[]>(postItems);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<PostDraft>(emptyPostDraft);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [bio, setBio] = useState(postProfile.bio);
  const [coverImage, setCoverImage] = useState(postProfile.coverImage);
  const [personal, setPersonal] = useState<PostPersonalDetails>(buildPersonalDetails);
  const [bioOpen, setBioOpen] = useState(false);

  const visiblePosts = activeTab === 'All Posts' ? posts : posts.filter((post) => post.kind === activeTab);

  const changeCover = (file: File) => {
    const url = URL.createObjectURL(file);

    setCoverImage((previous) => {
      if (previous.startsWith('blob:')) URL.revokeObjectURL(previous);
      return url;
    });
  };

  const removeCover = () =>
    setCoverImage((previous) => {
      if (previous.startsWith('blob:')) URL.revokeObjectURL(previous);
      return '';
    });

  const closeComposer = () => {
    setComposerOpen(false);
    setEditingPost(null);
  };

  const startEdit = (post: PostItem) => {
    setEditingPost(post);
    setComposerOpen(true);
  };

  const deletePost = (post: PostItem) => setPosts((current) => current.filter((item) => item.id !== post.id));

  const publish = (values: PostDraft) => {
    const images = values.media.filter((item) => item.type === 'image').map((item) => item.url);
    const video = values.media.find((item) => item.type === 'video')?.url;
    const serviceName = values.serviceName.trim();

    const fields = {
      kind: images.length > 0 ? ('Photos' as const) : video ? ('Videos' as const) : ('Travel Logs' as const),
      location: values.location.trim(),
      caption: values.caption.trim(),
      image: images[0] ?? '',
      gallery: images.length > 1 ? images : undefined,
      video,
      tags: values.tags.length > 0 ? values.tags : undefined,
      service: serviceName ? { type: values.serviceType, name: serviceName } : undefined,
      visibility: values.visibility,
    };

    if (editingPost) {
      setPosts((current) => current.map((item) => (item.id === editingPost.id ? { ...item, ...fields } : item)));
    } else {
      const post: PostItem = { id: `post-${Date.now()}`, postedAgo: 'Just now', likes: 0, comments: 0, ...fields };
      setPosts((current) => [post, ...current]);
      setDraft(emptyPostDraft);
    }

    closeComposer();
  };

  const saveDraft = (values: PostDraft) => {
    setDraft(values);
    closeComposer();
  };

  const initialDraft: PostDraft = editingPost ? toDraft(editingPost) : draft;

  return (
    <div className="brand-backdrop min-h-screen bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <PostProfileHeader
              account={accountProfile}
              profile={{ ...postProfile, bio, coverImage }}
              onCoverChange={changeCover}
              onCoverRemove={removeCover}
            />
            <PostPersonalInfo info={personal} onEditBio={() => setBioOpen(true)} />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {postTabs.map((tab) => {
                  const isActive = tab === activeTab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={[
                        'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                        isActive
                          ? 'border-[#001a43] bg-[#001a43] text-white shadow-[0_8px_20px_rgba(13,74,190,0.25)]'
                          : 'border-[#dfe7f5] bg-white text-[#3d4455] hover:text-[#001a43]',
                      ].join(' ')}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setComposerOpen(true)}
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Post
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post) => (
                  <PostCard key={post.id} post={post} authorName={accountProfile.name} onEdit={startEdit} onDelete={deletePost} />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#dfe7f5] bg-white/60 px-6 py-12 text-center text-[#566277]">
                  No {activeTab.toLowerCase()} yet.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {composerOpen ? (
        <AddPostModal
          initialDraft={initialDraft}
          mode={editingPost ? 'edit' : 'create'}
          onClose={closeComposer}
          onPublish={publish}
          onSaveDraft={saveDraft}
        />
      ) : null}

      {bioOpen ? (
        <EditBioModal
          initialBio={bio}
          initialInfo={personal}
          onClose={() => setBioOpen(false)}
          onSave={(value, info) => {
            setBio(value);
            setPersonal(info);
            setBioOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

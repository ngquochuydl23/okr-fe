import { useState, useEffect } from "react";
import { Dialog, Flex, Badge, Text, Progress, Avatar, Box, IconButton, Separator, Tooltip, Button, TextField, DataList, Code } from "@radix-ui/themes";
import { TbX, TbPencil, TbSend, TbMoodSmile, TbTargetArrow } from "react-icons/tb";
import { HiOutlineFlag } from "react-icons/hi";
import type { Descendant } from "slate";
import SlateEditor, { deserialize, serialize, EMPTY_VALUE } from "@/components/SlateEditor";
import type { Objective } from "@/pages/Objectives/components/ObjectiveTable";
import './objective-detail-panel.scss';
export interface ObjectiveDetailPanelProps {
  objective: Objective | null;
  color?: string;
  onSaveDescription?: (objectiveId: string, description: string, slateValue: Descendant[]) => Promise<void> | void;
}

type ActivityType = "comment" | "status_change" | "progress_update" | "created" | "key_result_added";

interface Reaction {
  emoji: string;
  users: string[];
}

interface Activity {
  id: string;
  type: ActivityType;
  user: {
    fullName: string;
    avatar: string;
  };
  content: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
  reactions?: Reaction[];
}

const REACTION_EMOJIS = ["👍", "❤️", "🎉", "🚀", "👀", "💯"];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    type: "comment",
    user: { fullName: "Nguyen Van A", avatar: "" },
    content: "We should focus on improving the conversion rate first before moving to other KRs.",
    createdAt: "2026-02-12T09:30:00Z",
    reactions: [
      { emoji: "👍", users: ["Tran Thi B", "Le Van C"] },
      { emoji: "🚀", users: ["Pham Thi D"] },
    ],
  },
  {
    id: "a2",
    type: "status_change",
    user: { fullName: "Tran Thi B", avatar: "" },
    content: "changed status",
    oldValue: "On Track",
    newValue: "At Risk",
    createdAt: "2026-02-11T16:45:00Z",
  },
  {
    id: "a3",
    type: "progress_update",
    user: { fullName: "Le Van C", avatar: "" },
    content: "updated progress",
    oldValue: "35%",
    newValue: "52%",
    createdAt: "2026-02-10T14:20:00Z",
  },
  {
    id: "a4",
    type: "comment",
    user: { fullName: "Pham Thi D", avatar: "" },
    content: "Great progress on this objective! Let's keep the momentum going into next week.",
    createdAt: "2026-02-09T11:00:00Z",
    reactions: [
      { emoji: "❤️", users: ["Nguyen Van A", "Tran Thi B", "Le Van C"] },
      { emoji: "💯", users: ["Nguyen Van A"] },
    ],
  },
  {
    id: "a5",
    type: "key_result_added",
    user: { fullName: "Nguyen Van A", avatar: "" },
    content: "added a new key result",
    newValue: "Increase monthly active users by 15%",
    createdAt: "2026-02-08T10:15:00Z",
  },
  {
    id: "a6",
    type: "created",
    user: { fullName: "Nguyen Van A", avatar: "" },
    content: "created this objective",
    createdAt: "2026-02-01T08:00:00Z",
  },
];
const getStatusColor = (status: string) => {
  switch (status) {
    case "On Track":
      return "green";
    case "At Risk":
      return "orange";
    case "Behind":
      return "red";
    default:
      return "gray";
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "Critical":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return "yellow";
    case "Low":
      return "blue";
    default:
      return "gray";
  }
};
const formatTimeAgo = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
const ObjectiveDetailPanel = ({ objective, color, onSaveDescription }: ObjectiveDetailPanelProps) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [slateValue, setSlateValue] = useState<Descendant[]>(EMPTY_VALUE);
  const [commentText, setCommentText] = useState("");
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [emojiPickerOpenId, setEmojiPickerOpenId] = useState<string | null>(null);

  const currentUser = objective?.owner.fullName ?? "";

  // Reset editor state when dialog opens with a new objective
  useEffect(() => {
    if (open && objective) {
      setSlateValue(deserialize(objective.description));
      setIsEditingDesc(false);
    }
    if (!open) {
      setIsEditingDesc(false);
    }
  }, [open, objective]);

  if (!objective) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(objective.id);
  };

  const handleStartEditing = () => {
    setIsEditingDesc(true);
  };

  const handleSaveDescription = async () => {
    if (!objective) return;
    setIsSaving(true);
    try {
      const plainText = serialize(slateValue);
      await onSaveDescription?.(objective.id, plainText, slateValue);
      setIsEditingDesc(false);
    } catch (error) {
      console.error("Failed to save description:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "green";
    if (progress >= 40) return "orange";
    return "red";
  };

  const handleCancelEditing = () => {
    // Reset to original value
    setSlateValue(deserialize(objective.description));
    setIsEditingDesc(false);
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    const newActivity: Activity = {
      id: `a-${Date.now()}`,
      type: "comment",
      user: { fullName: objective.owner.fullName, avatar: objective.owner.avatar },
      content: commentText.trim(),
      createdAt: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);
    setCommentText("");
  };

  const handleCommentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  const handleToggleReaction = (activityId: string, emoji: string) => {
    setActivities((prev) =>
      prev.map((a) => {
        if (a.id !== activityId) return a;
        const reactions = a.reactions ? [...a.reactions] : [];
        const existing = reactions.find((r) => r.emoji === emoji);
        if (existing) {
          if (existing.users.includes(currentUser)) {
            // Remove user from this reaction
            existing.users = existing.users.filter((u) => u !== currentUser);
            if (existing.users.length === 0) {
              return { ...a, reactions: reactions.filter((r) => r.emoji !== emoji) };
            }
          } else {
            existing.users = [...existing.users, currentUser];
          }
          return { ...a, reactions: [...reactions] };
        } else {
          return { ...a, reactions: [...reactions, { emoji, users: [currentUser] }] };
        }
      })
    );
    setEmojiPickerOpenId(null);
  };
  return (
    <div className="objective-detail__body">
      <div className="objective-detail__main">
        <div className="objective-detail__title">
          <TbTargetArrow color={color} size={'32px'} />
          <div className="header-title-wrapper">
            {/* Breadcums */}
            <h2>{objective.title}</h2>
          </div>
        </div>
        <div className="objective-detail__section">
          <div className="actions">
            <Button variant="soft" size="2">Edit</Button>
            <Button variant="soft">Add comment</Button>
          </div>
          <div className="objective-detail__section-label" style={{ marginBottom: '12px' }}>Details</div>
          <DataList.Root orientation="horizontal" size="2">
            <DataList.Item>
              <DataList.Label minWidth="100px" color="gray">Priority</DataList.Label>
              <DataList.Value>
                <Badge color={getPriorityColor(objective.priority) as any} variant="soft" radius="full">
                  {objective.priority ?? "Medium"}
                </Badge>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="100px" color="gray">Cycle</DataList.Label>
              <DataList.Value>
                <Badge variant="soft" radius="full">
                  {objective.cycle?.name}
                </Badge>
              </DataList.Value>
            </DataList.Item>
            {objective.mission && (
              <DataList.Item>
                <DataList.Label minWidth="100px" color="gray">Mission</DataList.Label>
                <DataList.Value>
                  <Text size="2">{objective.mission}</Text>
                </DataList.Value>
              </DataList.Item>
            )}

            <DataList.Item>
              <DataList.Label minWidth="100px" color="gray">Type</DataList.Label>
              <DataList.Value>
                <Badge variant="surface" color="gray">
                  {objective.type ?? "Team"}
                </Badge>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="100px" color="gray">Tags</DataList.Label>
              <DataList.Value>
                {objective.tags && objective.tags.length > 0 ? (
                  <Flex gap="2" wrap="wrap">
                    {objective.tags.map((tag) => (
                      <Badge key={tag} variant="outline" color="gray">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                ) : (
                  <Text color="gray" size="2">No tags</Text>
                )}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Separator size="4" my="4" />
          <Flex align="center" justify="between" mb="2">
            <div className="objective-detail__section-label">Description</div>
            {isEditingDesc ? (
              <Tooltip content="Edit description">
                <IconButton variant="ghost" size="1" color="gray" onClick={handleCancelEditing}>
                  <TbX size={14} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip content="Edit description">
                <IconButton variant="ghost" size="1" color="gray" onClick={handleStartEditing}>
                  <TbPencil size={14} />
                </IconButton>
              </Tooltip>
            )}
          </Flex>

          {isEditingDesc ? (
            <div className="objective-detail__description-editor">
              <SlateEditor
                value={slateValue}
                onChange={setSlateValue}
                placeholder="Write your description..."
              />
              <Flex gap="2" justify="end" align="center" mt="3">
                <Button
                  variant="soft"
                  color="gray"
                  size="1"
                  onClick={handleCancelEditing}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  size="1"
                  onClick={handleSaveDescription}
                  loading={isSaving}
                >
                  Save
                </Button>
              </Flex>
            </div>
          ) : (
            <div
              className={`objective-detail__description ${!objective.description ? "objective-detail__description-empty" : ""}`}
              onClick={handleStartEditing}
            >
              <SlateEditor
                value={slateValue}
                onChange={() => { }}
                readOnly
                placeholder="Click to add a description..."
              />
            </div>
          )}
        </div>

        <Separator size="4" mb="4" />

        {/* Key Results */}
        <div className="objective-detail__section">
          <Flex align="center" justify="between" mb="2">
            <div className="objective-detail__section-label" style={{ marginBottom: 0 }}>
              Key Results ({objective.keyResults.length})
            </div>
          </Flex>

          {objective.keyResults.length > 0 ? (
            <div className="objective-detail__kr-list">
              {objective.keyResults.map((kr, index) => (
                <div key={kr.id} className="objective-detail__kr-item">
                  <span className="objective-detail__kr-index">{index + 1}</span>
                  <HiOutlineFlag size={14} color="var(--gray-9)" style={{ flexShrink: 0 }} />
                  <Text size="2" className="objective-detail__kr-title" truncate>{kr.title}</Text>
                  <div className="objective-detail__kr-progress">
                    <Progress
                      value={kr.progress}
                      size="1"
                      color={getProgressColor(kr.progress) as any}
                    />
                    <Text size="1" color="gray" weight="medium">
                      {kr.progress}%
                    </Text>
                  </div>
                  <Badge color={getStatusColor(kr.status) as any} size="1" style={{ flexShrink: 0 }}>
                    {kr.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="objective-detail__activity-empty">
              No key results added yet
            </div>
          )}
        </div>

        <Separator size="4" mb="4" />

        {/* Activity */}
        <div className="objective-detail__section">
          <div className="objective-detail__section-label">Activities</div>

          {/* Comment input */}
          <div className="objective-detail__comment-input">
            <Avatar
              size="1"
              radius="full"
              src={objective.owner.avatar}
              fallback={objective.owner.fullName.charAt(0)}
            />
            <TextField.Root
              variant="surface"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleCommentKeyDown}
              style={{ flex: 1 }}
            />
            <IconButton
              variant="soft"
              size="1"
              onClick={handlePostComment}
              disabled={!commentText.trim()}
            >
              <TbSend size={14} />
            </IconButton>
          </div>

          {/* Activity feed */}
          <div className="objective-detail__activity-feed">
            {activities.map((activity) => (
              <div key={activity.id} className="objective-detail__activity-item">
                <Avatar
                  size="1"
                  radius="full"
                  src={activity.user.avatar}
                  fallback={activity.user.fullName.charAt(0)}
                  className="objective-detail__activity-avatar"
                />
                <div className="objective-detail__activity-body">
                  <div className="objective-detail__activity-header">
                    <Text size="2" weight="medium">{activity.user.fullName}</Text>
                    <Text size="1" color="gray">{formatTimeAgo(activity.createdAt)}</Text>
                  </div>

                  {activity.type === "comment" ? (
                    <div className="objective-detail__activity-comment">
                      <div className="objective-detail__activity-comment-text">
                        {activity.content}
                      </div>

                      {/* Reactions display */}
                      <div className="objective-detail__reactions">
                        {activity.reactions?.map((reaction) => (
                          <Tooltip key={reaction.emoji} content={reaction.users.join(", ")}>
                            <button
                              className={`objective-detail__reaction-badge ${reaction.users.includes(currentUser) ? "objective-detail__reaction-badge--active" : ""
                                }`}
                              onClick={() => handleToggleReaction(activity.id, reaction.emoji)}
                            >
                              <span>{reaction.emoji}</span>
                              <span className="objective-detail__reaction-count">{reaction.users.length}</span>
                            </button>
                          </Tooltip>
                        ))}

                        {/* Add reaction button */}
                        <div className="objective-detail__reaction-picker-wrapper">
                          <Tooltip content="Add reaction">
                            <button
                              className="objective-detail__reaction-add"
                              onClick={() => setEmojiPickerOpenId(
                                emojiPickerOpenId === activity.id ? null : activity.id
                              )}
                            >
                              <TbMoodSmile size={14} />
                            </button>
                          </Tooltip>
                          {emojiPickerOpenId === activity.id && (
                            <div className="objective-detail__emoji-picker">
                              {REACTION_EMOJIS.map((emoji) => (
                                <button
                                  key={emoji}
                                  className="objective-detail__emoji-option"
                                  onClick={() => handleToggleReaction(activity.id, emoji)}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="objective-detail__activity-update">
                      <Text size="1" color="gray">{activity.content}</Text>
                      {activity.oldValue && activity.newValue && (
                        <Flex align="center" gap="1" mt="1">
                          <Badge size="1" color="gray" variant="surface">{activity.oldValue}</Badge>
                          <Text size="1" color="gray">→</Text>
                          <Badge size="1" variant="surface">{activity.newValue}</Badge>
                        </Flex>
                      )}
                      {!activity.oldValue && activity.newValue && (
                        <Text size="1" color="gray" mt="1" as="p">
                          "{activity.newValue}"
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="objective-detail__sidebar">
        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Status</div>
          <Badge color={getStatusColor(objective.status) as any} size="2">
            {objective.status}
          </Badge>
        </div>

        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Progress</div>
          <Flex direction="column" gap="1">
            <Text size="4" weight="bold" color={getProgressColor(objective.progress) as any}>
              {objective.progress}%
            </Text>
            <Progress
              value={objective.progress}
              size="2"
              color={getProgressColor(objective.progress) as any}
              className="objective-detail__progress-bar"
            />
          </Flex>
        </div>
        <Separator size="4" mb="4" />
        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Owner</div>
          <Flex align="center" gap="2">
            <Avatar
              size="2"
              radius="full"
              src={objective.owner.avatar}
              fallback={objective.owner.fullName.charAt(0)}
            />
            <Box>
              <Text size="2" weight="medium">{objective.owner.fullName}</Text>
            </Box>
          </Flex>
        </div>
        {objective.team && (
          <div className="objective-detail__sidebar-field">
            <div className="objective-detail__sidebar-field-label">Team</div>
            <Text size="2">{objective.team.name}</Text>
          </div>
        )}
        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Cycle</div>
          <Badge variant="surface" size="2">
            {objective.cycle.name}
          </Badge>
        </div>
        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Due Date</div>
          <Text size="2">{objective.dueDate}</Text>
        </div>

        <Separator size="4" mb="4" />
        <div className="objective-detail__sidebar-field">
          <div className="objective-detail__sidebar-field-label">Details</div>
          <div className="objective-detail__dates">
            <div className="objective-detail__dates-row">
              <span className="objective-detail__dates-label">Key Results</span>
              <span>{objective.keyResults.length}</span>
            </div>
            <div className="objective-detail__dates-row">
              <span className="objective-detail__dates-label">Objective ID</span>
              <span>{objective.id.slice(0, 8)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObjectiveDetailPanel;